from cog import BasePredictor, Input, Path
import torch
from diffusers import StableDiffusionImg2ImgPipeline
from PIL import Image
from typing import Optional

class Predictor(BasePredictor):
    def setup(self):
        """Load the model into memory to make running multiple predictions efficient"""
        print("Loading Stable Diffusion model...")
        
        # Load Stable Diffusion img2img pipeline
        # Disable safety checker for unrestricted content
        self.pipe = StableDiffusionImg2ImgPipeline.from_pretrained(
            "runwayml/stable-diffusion-v1-5",
            torch_dtype=torch.float16,
            safety_checker=None,  # Disable safety checker for unrestricted content
            requires_safety_checker=False,
        )
        
        # Move to GPU and optimize
        self.pipe = self.pipe.to("cuda")
        self.pipe.enable_xformers_memory_efficient_attention()
        
        print("Model loaded successfully!")

    def predict(
        self,
        image: Path = Input(description="Input image to transform"),
        prompt: str = Input(description="Text prompt describing the transformation"),
        negative_prompt: str = Input(
            description="Negative prompt (what to avoid)",
            default="blurry, low quality, distorted, watermark, text"
        ),
        strength: float = Input(
            description="How much to transform the image (0.0-1.0). Higher = more change",
            ge=0.0,
            le=1.0,
            default=0.75
        ),
        guidance_scale: float = Input(
            description="How closely to follow the prompt. Higher = more adherence",
            ge=1.0,
            le=20.0,
            default=10.0
        ),
        num_inference_steps: int = Input(
            description="Number of denoising steps. More = better quality but slower",
            ge=10,
            le=50,
            default=40
        ),
        seed: Optional[int] = Input(
            description="Random seed for reproducibility. Leave empty for random.",
            default=None
        )
    ) -> Path:
        """Run a single prediction on the model"""
        
        # Load and prepare input image
        input_image = Image.open(str(image)).convert("RGB")
        input_image = input_image.resize((768, 768))  # Higher resolution for better quality
        
        # Set seed if provided
        generator = None
        if seed is not None:
            generator = torch.Generator(device="cuda").manual_seed(seed)
        
        # Run inference
        print(f"Running inference with prompt: {prompt}")
        result = self.pipe(
            prompt=prompt,
            image=input_image,
            negative_prompt=negative_prompt,
            strength=strength,
            guidance_scale=guidance_scale,
            num_inference_steps=num_inference_steps,
            generator=generator,
        )
        
        # Extract result image
        output_image = result.images[0]
        
        # Save to output path
        output_path = "/tmp/output.png"
        output_image.save(output_path)
        
        return Path(output_path)

