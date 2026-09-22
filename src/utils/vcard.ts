/**
 * Generates and downloads a .vcf (vCard) file for Fábio Gustavo de Minas.
 * Compatible with iOS, Android, macOS, and Windows contact managers.
 */
export function downloadVCard() {
  const vcardData = `BEGIN:VCARD
VERSION:3.0
N:de Minas;Fábio;Gustavo;;
FN:Fábio Gustavo de Minas
TITLE:Analista de Suporte PL — Suporte VIP & Alta Exigência
ORG:Netcenter / Pinheiro Guimarães Advogados
TEL;TYPE=CELL,VOICE;TYPE=PREF:+5511954237500
EMAIL;TYPE=INTERNET,WORK:fabiominas@outlook.com
URL;TYPE=LinkedIn:https://www.linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/
URL;TYPE=GitHub:https://github.com/fabiominas
ADR;TYPE=WORK:;;São Paulo;SP;;Brasil
NOTE:Analista de TI com mais de 19 anos de experiência em suporte técnico executivo, VIP, Microsoft 365, Intune, Entra ID, Active Directory e iManage.
END:VCARD`;

  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Fabio_Gustavo_de_Minas.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
