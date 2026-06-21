DeployDaemon Workflow

Purpose:Deploy the daemon website and sync data to MCP KV store. Does NOT aggregate or modify content — use UpdateDaemon for that.

Trigger Phrases

- "deploy daemon"
- "push daemon"
- "ship daemon"

Process

Step : Push Website to GitHub

```bash
cd ~/Projects/daemon && git add -A && git commit -m "Deploy daemon $(date +%Y-%m-%d)" && git push
```

Pre-commit hook runs automatically and blocks sensitive data. Cloudflare Pages auto-deploys on push.

Step : Sync Data to MCP KV Store

```bash
cd ${CLAUDE_SKILL_DIR}/Mcp && bun install && bun update-daemon
```

This runs the existing pipeline: sync integrations, aggregate daemon.md + integrations, validate with Zod, upload to Cloudflare KV.

Step : Verify Deployment

```bash
curl -s -o /dev/null -w "%{http_code}" https://daemon.example.com
```

```bash
curl -s https://mcp.daemon.example.com \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":".","method":"tools/call","params":{"name":"get_about","arguments":{}},"id":}' | head -c ```

Notes

- If only website UI changed (no content): Step is sufficient
- If daemon.md content changed: Both steps needed
- Run UpdateDaemonworkflow FIRST if you want to aggregate fresh PAI data
