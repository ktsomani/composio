/**
 * @fileoverview Shared transform for converting SDK SessionProxyExecuteParams
 * to the official @composio/client proxy execute params.
 */
import type { SessionProxyExecuteParams } from '../types/toolRouter.types';
import type { ProxyBinaryBody } from '../types/tool.types';
import type { SessionProxyExecuteParams as ClientProxyExecuteParams } from '@composio/client/resources/tool-router/session';

/** Map the SDK's camelCase binary upload onto the client's `binary_body`. */
export function toWireBinaryBody(
  binaryBody: ProxyBinaryBody
): NonNullable<ClientProxyExecuteParams['binary_body']> {
  const contentType =
    binaryBody.contentType !== undefined ? { content_type: binaryBody.contentType } : {};
  if ('url' in binaryBody) {
    return { url: binaryBody.url, ...contentType };
  }
  return { base64: binaryBody.base64, ...contentType };
}

/**
 * Transform SDK session proxy params to the official client request format.
 * Converts SDK-facing `toolkit` → `toolkit_slug` and `parameters[].in` → `parameters[].type`.
 */
export function transformProxyParams(params: SessionProxyExecuteParams): ClientProxyExecuteParams {
  const parameters: ClientProxyExecuteParams['parameters'] = params.parameters?.map(p => ({
    name: p.name,
    type: p.in as 'header' | 'query',
    value: p.value.toString(),
  }));

  return {
    toolkit_slug: params.toolkit,
    endpoint: params.endpoint,
    method: params.method,
    ...(params.body !== undefined ? { body: params.body } : {}),
    ...(params.binaryBody !== undefined
      ? { binary_body: toWireBinaryBody(params.binaryBody) }
      : {}),
    ...(parameters?.length ? { parameters } : {}),
  };
}
