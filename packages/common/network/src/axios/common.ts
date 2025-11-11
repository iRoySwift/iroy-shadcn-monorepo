import type { ObjParams } from "../../index";
import errorCode, { ErrorCodeKey } from "./errorCode";
import { service } from "./service.js";
import { saveAs } from "file-saver";
/**
 * 验证是否为blob格式
 * @param data
 * @returns
 */
export async function isBlobValidate(data: Blob): Promise<boolean> {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: ObjParams): string {
  let result = "";
  const entries = Object.entries(params ?? {});
  for (const [propName, value] of entries) {
    const part = encodeURIComponent(propName) + "=";
    if (value !== null && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          const nestedValue = (value as Record<string, unknown>)[key];
          if (nestedValue !== null && typeof nestedValue !== "undefined") {
            const paramKey = `${propName}[${key}]`;
            const subPart = encodeURIComponent(paramKey) + "=";
            result += subPart + encodeURIComponent(String(nestedValue)) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(String(value)) + "&";
      }
    }
  }
  return result;
}

// 通用下载方法
export function download(url: string, params: ObjParams, filename: string) {
  alert({ text: "正在下载数据，请稍候", background: "rgba(0, 0, 0, 0.7)" });
  return service
    .post(url, params, {
      transformRequest: [
        params => {
          return tansParams(params);
        },
      ],
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "blob",
    })
    .then(async (data: any) => {
      const isBlob = await isBlobValidate(data);
      if (isBlob) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText) as {
          code?: unknown;
          msg?: string;
        };
        const normalizedCode = String(rspObj.code) as ErrorCodeKey;
        const errMsg =
          errorCode[normalizedCode] ?? rspObj.msg ?? errorCode.default;
        alert(errMsg);
      }
    })
    .catch(() => {
      alert("下载文件出现错误，请联系管理员！");
    });
}
