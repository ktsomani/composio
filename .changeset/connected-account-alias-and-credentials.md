---
'@composio/core': patch
'@composio/slim': patch
---

`connectedAccounts.update()` accepts the documented `alias` and `connection` updates and sends them to the connected-account PATCH endpoint. `{ enabled }` still updates status, and it cannot be combined with an alias or credential change.
