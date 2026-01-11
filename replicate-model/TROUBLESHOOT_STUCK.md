# Build Stuck at "Transferring Context" - Troubleshooting

## Is It Actually Stuck?

"Transferring context: 83.24kB" should take **seconds**, not minutes. If it's been stuck here for more than **5-10 minutes**, something might be wrong.

## Check If Process is Running

**In another terminal, run:**

```bash
# Check if cog/docker is running
ps aux | grep -E "cog|docker" | grep -v grep

# Check Docker containers
docker ps -a

# Check Docker build processes
docker ps --filter "status=building"
```

**If you see processes running, it's still working (just not showing output).**

## Common Causes

### 1. Docker Desktop Resources Exhausted
Docker might be out of memory or CPU.

**Fix:**
- Docker Desktop → Settings → Resources
- Check if Memory/CPU are maxed out
- Increase if possible (Memory: 4GB+, CPUs: 2+)

### 2. Disk Space
Building requires ~15-20GB free space.

**Check:**
```bash
df -h
```

### 3. Docker Build Context Too Large
If there are large files in the directory.

**Check:**
```bash
cd /Users/jessica-leetingley/R2Sync/facefix-studio/replicate-model
du -sh .
```

Should be small (< 1MB) - if it's huge, check for large files.

### 4. Docker Daemon Issues
Docker might need restart.

**Try:**
```bash
# Restart Docker Desktop
# Or restart Docker daemon (if you can)
docker info
```

## What to Do

### Option 1: Wait a Bit More (5-10 min)
Sometimes Docker processes internally without output. If CPU/disk activity is happening, wait.

### Option 2: Check System Activity
- Open Activity Monitor
- Look for `Docker Desktop` or `dockerd` processes
- Are they using CPU/memory?
- If yes → still working, just wait
- If no → might be stuck

### Option 3: Cancel and Restart
If it's been stuck >10 minutes with no activity:

1. **Cancel:** Press `Ctrl+C` in the terminal
2. **Clean up:**
   ```bash
   docker system prune -f
   ```
3. **Increase Docker resources** (Settings → Resources)
4. **Try again:**
   ```bash
   cd /Users/jessica-leetingley/R2Sync/facefix-studio/replicate-model
   cog push r8.im/jesstingley17/facefix-studio
   ```

### Option 4: Check Logs
Docker might have logs even if terminal is quiet:

```bash
docker ps -a
docker logs <container-id>  # if you see a build container
```

## When to Give Up

- Stuck >20 minutes with **zero** CPU/disk activity
- Docker Desktop shows errors
- System resources maxed out with no progress

## Alternative: Build on Replicate

If local build keeps failing, you can:
1. Push code to GitHub
2. Use Replicate's web interface to build
3. Or try again later with more Docker resources

## Quick Check Right Now

Run these commands in a **new terminal**:

```bash
# 1. Is Docker running?
docker info

# 2. Any build processes?
docker ps --filter "status=building"

# 3. System resources?
docker system df

# 4. Check your model directory size
cd /Users/jessica-leetingley/R2Sync/facefix-studio/replicate-model
du -sh .
ls -lah
```

If Docker info works and there's a build process, **it's still running** - just be patient.

If Docker info fails or no build process exists, **it might be stuck** - try restarting.

