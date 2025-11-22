declare module "@iroy/i18n/client" {
  export type Translator = (key: string) => string;
  export function useTranslator(): Translator;
  export default useTranslator;
}
