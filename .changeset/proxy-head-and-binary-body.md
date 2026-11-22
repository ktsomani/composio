---
'@composio/core': patch
'@composio/slim': patch
'@composio/python-sdk': patch
---

Proxy execution accepts `HEAD` and forwards a binary upload. Pass `binaryBody` with `url` or `base64` in TypeScript, and `binary_body` with `url` or `base64` in Python. Setting both is rejected.
