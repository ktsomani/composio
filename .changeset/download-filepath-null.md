---
'@composio/core': patch
'@composio/slim': patch
---

`FileDownloadData.filePath` is `string | null`. A failed save, or a runtime without a filesystem, already returned `null` at runtime. The type now says so.
