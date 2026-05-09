# Kubernetes Daily Cluster Check

## When to use this skill
User asks for daily cluster check, cluster health, or morning k8s review.

## Allowed tools
- kubectl config get-contexts
- kubectl get nodes
- kubectl get pods --all-namespaces
- kubectl get events
- kubectl get pv
- kubectl get pvc
- kubectl describe nodes
- kubectl describe pods
- kubectl top nodes
- kubectl top pods
- kubectl --context

## Denied tools
- kubectl delete
- kubectl apply
- kubectl edit
- kubectl patch
- terraform apply

## What to check and why it matters to me

### 1. Nodes health
- Are all nodes Ready?
- Any node with pressure conditions (MemoryPressure, DiskPressure, PIDPressure)?
- Any node NotReady for more than 5 minutes?

### 2. Failing pods
- Any pod in CrashLoopBackOff or Error state?
- Any pod restarting more than 5 times?
- Any pod Pending for more than 10 minutes? (could be resource starvation)

### 3. Resource pressure
- Any namespace consuming more than 80% of its resource quota?
- Any pod without resource limits defined? (flag as risk)

### 4. Recent events
- Any Warning events in the last 24 hours?
- Ignore: Normal events, successful pulls, scheduled events

### 5. PersistentVolumes
- Any PV in Failed or Released state?
- Any PVC in Pending state?

### 6. Running versions
- List all deployments and their current image tags
- Flag any deployment still running `latest` tag — this is a risk

## How I want the output

Structure the response in this exact order:

1. Header: context names checked + timestamp
2. HEALTHY: one line summary of what is fine
3. ATTENTION: bullet list, priority order, format → [context] description → reason
4. VERSIONS: table showing dev/staging/prod image tags side by side
   - Flag drift between environments
   - Flag any `latest` tag as risk
5. CRITICAL: if empty write "None" — never skip this section

Keep the whole output under 30 lines.
Never dump raw kubectl output.
If outside working hours and dev/staging nodes are down, skip those contexts entirely.

If everything is healthy, just say so clearly. Don't invent problems.

## Gotchas
- Run `kubectl config get-contexts` first to discover available contexts
- Never assume context names — always read from the actual output
- dev and staging environments use us-east-1
- production environments use us-east-
- The Development and Staging environment needs to be up on working hours but off ouside of this range.
- Never run kubectl delete or any destructive command
- If a check fails due to permissions, skip it and tell me

## Environment schedules
- dev and staging: expected UP only during working hours (Mon-Fri 8am-6pm)
  - If checked OUTSIDE this window and nodes are down → this is EXPECTED, do not flag as issue
  - If checked INSIDE this window and nodes are down → flag as CRITICAL
- production: expected UP 24/7
  - If any node is down at any time → flag as CRITICAL