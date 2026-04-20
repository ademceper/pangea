import { kcSanitize } from "keycloakify/lib/kcSanitize"
import type { PageProps } from "keycloakify/login/pages/PageProps"

import { Input } from "@pangea/ui/components/input"

import type { KcContext } from "../KcContext"
import type { I18n } from "../i18n"

export default function Code(
  props: PageProps<Extract<KcContext, { pageId: "code.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props
  const { code } = kcContext
  const { msg } = i18n

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={
        code.success
          ? msg("codeSuccessTitle")
          : msg("codeErrorTitle", code.error)
      }
    >
      <div id="kc-code" className="space-y-3">
        {code.success ? (
          <>
            <p className="text-sm text-muted-foreground">
              {msg("copyCodeInstruction")}
            </p>
            <Input id="code" defaultValue={code.code} readOnly />
          </>
        ) : (
          code.error && (
            <p
              id="error"
              className="text-sm text-destructive"
              aria-live="polite"
              dangerouslySetInnerHTML={{
                __html: kcSanitize(code.error),
              }}
            />
          )
        )}
      </div>
    </Template>
  )
}
