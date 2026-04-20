import type { PageProps } from "keycloakify/login/pages/PageProps"
import { kcSanitize } from "keycloakify/lib/kcSanitize"

import { Button } from "@pangea/ui/components/button"

import type { KcContext } from "../KcContext"
import type { I18n } from "../i18n"

export default function Error(
  props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props
  const { message, client, skipLink } = kcContext
  const { msg } = i18n

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={false}
      headerNode={msg("errorTitle")}
    >
      <div className="space-y-4">
        <p
          className="text-sm text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
        />
        {!skipLink && !!client?.baseUrl && (
          <Button asChild variant="link" className="h-auto p-0">
            <a id="backToApplication" href={client.baseUrl}>
              {msg("backToApplication")}
            </a>
          </Button>
        )}
      </div>
    </Template>
  )
}
