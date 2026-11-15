/** Earthy coloured-pencil palette: olive, ochre, terracotta-brown, dusty blue on warm cream. Umber line, never black. */
export const C = {
  ink: "#3A2F28",
  paper: "#F5EAD2",
  cream: "#F5EAD2",
  olive: "#8A9442",
  oliveDark: "#5E6B33",
  oliveLight: "#C4C46E",
  forest: "#4F6B3E",
  ochre: "#D2A03C",
  terracotta: "#A8603C",
  bark: "#8A5A3C",
  dustyBlue: "#8FA9B5",
  skin: "#D3A584",
  skinShade: "#BA8764",
  hair: "#2A2322",
  hairLight: "#5A4C45",
  tee: "#5F7088",
  teeDark: "#46566C",
  pants: "#7E8048",
  pantsShade: "#626436",
  boot: "#B8946A",
  silver: "#C4C8CB",
  rose: "#C98F85",
};
export const LINE = { stroke: C.ink, strokeWidth: 1.3, strokeLinejoin: "round", strokeLinecap: "round" } as const;
export const FINE = { stroke: C.ink, strokeWidth: 0.8, strokeLinejoin: "round", strokeLinecap: "round" } as const;
