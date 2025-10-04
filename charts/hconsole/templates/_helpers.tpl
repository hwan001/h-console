{{- define "hconsole.fullname" -}}
{{ .Release.Name }}-{{ .component }}
{{- end }}

{{- define "hconsole.name" -}}
{{ .Chart.Name }}
{{- end }}

{{- define "hconsole.labels" -}}
app.kubernetes.io/name: {{ include "hconsole.name" . }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

