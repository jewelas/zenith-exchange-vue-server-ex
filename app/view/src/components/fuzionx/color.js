const defaultColor = {
  'a-1-bg': 'rgba(51,70,98,1)',
  'a-1-bd': 'rgba(51,70,98,1)',
  'a-1-cl': 'rgba(51,70,98,1)',
  'a-2-bg': 'rgba(18,29,49,1)',
  'a-2-bd': 'rgba(18,29,49,1)',
  'a-2-cl': 'rgba(18,29,49,1)',
  'a-3-bg': 'rgba(30,42,64,1)',
  'a-3-bd': 'rgba(30,42,64,1)',
  'a-3-cl': 'rgba(30,42,64,1)',
  'a-4-bg': 'rgba(30,42,64,1)',
  'a-4-bd': 'rgba(30,42,64,1)',
  'a-4-cl': 'rgba(30,42,64,1)',
  'a-5-bg': 'rgba(17,28,48,1)',
  'a-5-bd': 'rgba(17,28,48,1)',
  'a-5-cl': 'rgba(17,28,48,1)',
  'a-6-bg': 'rgba(0,0,0,1)',
  'a-6-bd': 'rgba(31,63,89,0.8)',
  'a-6-cl': 'rgba(31,63,89,0.8)',
  'a-7-bg': 'rgba(10,18,32,1)',
  'a-7-bd': 'rgba(10,18,32,1)',
  'a-7-cl': 'rgba(10,18,32,1)',
  'a-8-bg': 'rgba(23,26,33,1)',
  'a-8-bd': 'rgba(23,26,33,1)',
  'a-8-cl': 'rgba(23,26,33,1)',
  'a-9-bg': 'rgba(0,0,0,0.5)',
  'a-9-bd': 'rgba(0,0,0,0.5)',
  'a-9-cl': 'rgba(0,0,0,0.5)',
  'a-10-bg': 'rgba(130,142,161,0.3)',
  'a-10-bd': 'rgba(130,142,161,0.3)',
  'a-10-cl': 'rgba(130,142,161,0.3)',
  'a-11-bg': 'rgba(130,142,161,0.15)',
  'a-11-bd': 'rgba(130,142,161,0.15)',
  'a-11-cl': 'rgba(130,142,161,0.15)',
  'a-12-bg': 'rgba(18,31,53,1)',
  'a-12-bd': 'rgba(18,31,53,1)',
  'a-12-cl': 'rgba(18,31,53,1)',
  'a-13-bg': 'rgba(36,160,245,0.5)',
  'a-13-bd': 'rgba(36,160,245,0.5)',
  'a-13-cl': 'rgba(36,160,245,0.5)',
  'a-14-bg': 'rgba(36,160,245,0.3)',
  'a-14-bd': 'rgba(36,160,245,0.3)',
  'a-14-cl': 'rgba(36,160,245,0.3)',
  'a-15-bg': 'rgba(36,160,245,0.20)',
  'a-15-bd': 'rgba(36,160,245,0.20)',
  'a-15-cl': 'rgba(36,160,245,0.20)',
  'a-16-bg': 'rgba(36,160,245,0.15)',
  'a-16-bd': 'rgba(36,160,245,0.15)',
  'a-16-cl': 'rgba(36,160,245,0.15)',
  'a-17-bg': 'rgba(36,160,245,0.05)',
  'a-17-bd': 'rgba(36,160,245,0.05)',
  'a-17-cl': 'rgba(36,160,245,0.05)',
  'a-18-bg': 'rgba(19,184,135,1)',
  'a-18-bd': 'rgba(19,184,135,1)',
  'a-18-cl': 'rgba(19,184,135,1)',
  'a-19-bg': 'rgba(235,77,92,1)',
  'a-19-bd': 'rgba(235,77,92,1)',
  'a-19-cl': 'rgba(235,77,92,1)',
  'a-20-bg': 'rgba(250,173,20,1)',
  'a-20-bd': 'rgba(250,173,20,1)',
  'a-20-cl': 'rgba(250,173,20,1)',
  'a-21-bg': 'rgba(29,38,53,0.99)',
  'a-21-bd': 'rgba(29,38,53,0.99)',
  'a-21-cl': 'rgba(29,38,53,0.99)',
  'a-22-bg': 'rgba(255,255,255,0.2)',
  'a-22-bd': 'rgba(255,255,255,0.2)',
  'a-22-cl': 'rgba(255,255,255,0.2)',
  'b-1-bg': 'rgba(216,225,240,1)',
  'b-1-bd': 'rgba(216,225,240,1)',
  'b-1-cl': 'rgba(216,225,240,1)',
  'b-2-bg': 'rgba(93,109,137,1)',
  'b-2-bd': 'rgba(93,109,137,1)',
  'b-2-cl': 'rgba(93,109,137,1)',
  'b-3-bg': 'rgba(49,62,85,1)',
  'b-3-bd': 'rgba(49,62,85,1)',
  'b-3-cl': 'rgba(86,118,165,1)',
  'b-4-bg': 'rgba(36,160,245,1)',
  'b-4-bd': 'rgba(36,160,245,1)',
  'b-4-cl': 'rgba(36,160,245,1)',
  'b-5-bg': 'rgba(19,184,135,1)',
  'b-5-bd': 'rgba(19,184,135,1)',
  'b-5-cl': 'rgba(19,184,135,1)',
  'b-6-bg': 'rgba(235,77,92,1)',
  'b-6-bd': 'rgba(235,77,92,1)',
  'b-6-cl': 'rgba(235,77,92,1)',
  'b-7-bg': 'rgba(250,173,20,1)',
  'b-7-bd': 'rgba(250,173,20,1)',
  'b-7-cl': 'rgba(250,173,20,1)',
  'b-8-bg': 'rgba(255,255,255,1)',
  'b-8-bd': 'rgba(255,255,255,1)',
  'b-8-cl': 'rgba(255,255,255,1)',
  'b-9-bg': 'rgba(255,255,255,0.6)',
  'b-9-bd': 'rgba(255,255,255,0.6)',
  'b-9-cl': 'rgba(255,255,255,0.6)',
  'c-1-bg': 'rgba(48,120,255,1)',
  'c-1-bd': 'rgba(48,120,255,1)',
  'c-1-cl': 'rgba(48,120,255,1)',
  'c-2-bg': 'rgba(48,120,255,0.15)',
  'c-2-bd': 'rgba(48,120,255,0.15)',
  'c-2-cl': 'rgba(48,120,255,0.15)',
  'c-3-bg': 'rgba(0,181,149,1)',
  'c-3-bd': 'rgba(0,181,149,1)',
  'c-3-cl': 'rgba(0,181,149,1)',
  'c-4-bg': 'rgba(0,181,149,0.15)',
  'c-4-bd': 'rgba(0,181,149,0.15)',
  'c-4-cl': 'rgba(0,181,149,0.15)',
  'c-5-bg': 'rgba(209,66,94,1)',
  'c-5-bd': 'rgba(209,66,94,1)',
  'c-5-cl': 'rgba(209,66,94,1)',
  'c-6-bg': 'rgba(209,66,94,0.15)',
  'c-6-bd': 'rgba(209,66,94,0.15)',
  'c-6-cl': 'rgba(209,66,94,0.15)',
  'c-7-bg': 'rgba(233,169,42,1)',
  'c-7-bd': 'rgba(233,169,42,1)',
  'c-7-cl': 'rgba(233,169,42,1)',
  'c-8-bg': 'rgba(0,0,0,0.5)',
  'c-8-bd': 'rgba(0,0,0,0.5)',
  'c-8-cl': 'rgba(0,0,0,0.5)',
  'c-9-bg': 'rgba(209,66,94,0.8)',
  'c-9-bd': 'rgba(209,66,94,0.8)',
  'c-9-cl': 'rgba(209,66,94,0.8)',
  'c-10-bg': 'rgba(255,255,255,0.1)',
  'c-10-bd': 'rgba(255,255,255,0.1)',
  'c-10-cl': 'rgba(255,255,255,0.1)',
  'd-1-bg': 'rgba(245,203,137,1)',
  'd-1-bd': 'rgba(245,203,137,1)',
  'd-1-cl': 'rgba(245,203,137,1)',
  'd-2-bg': 'rgba(95,207,191,1)',
  'd-2-bd': 'rgba(95,207,191,1)',
  'd-2-cl': 'rgba(95,207,191,1)',
  'd-3-bg': 'rgba(221,137,245,1)',
  'd-3-bd': 'rgba(221,137,245,1)',
  'd-3-cl': 'rgba(221,137,245,1)',
  'd-4-bg': 'rgba(233,169,145,1)',
  'd-4-bd': 'rgba(233,169,145,1)',
  'd-4-cl': 'rgba(233,169,145,1)',
  'f-1-bg': 'rgba(237,244,248,1)',
  'f-1-bd': 'rgba(237,244,248,1)',
  'f-1-cl': 'rgba(237,244,248,1)',
  'f-2-bg': 'rgba(130,142,161,1)',
  'f-2-bd': 'rgba(130,142,161,1)',
  'f-2-cl': 'rgba(130,142,161,1)',
  'f-3-bg': 'rgba(90,102,121,1)',
  'f-3-bd': 'rgba(90,102,121,1)',
  'f-3-cl': 'rgba(90,102,121,1)',
  'f-4-bg': 'rgba(36,160,245,1)',
  'f-4-bd': 'rgba(36,160,245,1)',
  'f-4-cl': 'rgba(36,160,245,1)',
  'f-5-bg': 'rgba(19,184,135,1)',
  'f-5-bd': 'rgba(19,184,135,1)',
  'f-5-cl': 'rgba(19,184,135,1)',
  'f-6-bg': 'rgba(235,77,92,1)',
  'f-6-bd': 'rgba(235,77,92,1)',
  'f-6-cl': 'rgba(235,77,92,1)',
  'f-7-bg': 'rgba(250,173,20,1)',
  'f-7-bd': 'rgba(250,173,20,1)',
  'f-7-cl': 'rgba(250,173,20,1)',
  'f-8-bg': 'rgba(255,255,255,1)',
  'f-8-bd': 'rgba(255,255,255,1)',
  'f-8-cl': 'rgba(255,255,255,1)',
  'f-9-bg': 'rgba(255,255,255,0.6)',
  'f-9-bd': 'rgba(255,255,255,0.6)',
  'f-9-cl': 'rgba(255,255,255,0.6)',
  'h-1-bg': 'rgba(29,38,53,1)',
  'h-1-bd': 'rgba(29,38,53,1)',
  'h-1-cl': 'rgba(29,38,53,1)',
  'h-2-bg': 'rgba(29,38,53,1)',
  'h-2-bd': 'rgba(29,38,53,1)',
  'h-2-cl': 'rgba(29,38,53,1)',
  'h-3-bg': 'rgba(41,52,72,1)',
  'h-3-bd': 'rgba(41,52,72,1)',
  'h-3-cl': 'rgba(41,52,72,1)',
  'h-4-bg': 'rgba(38,48,67,1)',
  'h-4-bd': 'rgba(38,48,67,1)',
  'h-4-cl': 'rgba(38,48,67,1)',
  'h-5-bg': 'rgba(36,160,245,0.2)',
  'h-5-bd': 'rgba(36,160,245,0.2)',
  'h-5-cl': 'rgba(36,160,245,0.2)',
  'x-1-bg': 'rgba(237,244,248,1)',
  'x-1-bd': 'rgba(237,244,248,1)',
  'x-1-cl': 'rgba(237,244,248,1)',
  'x-2-bg': 'rgba(130,142,161,1)',
  'x-2-bd': 'rgba(130,142,161,1)',
  'x-2-cl': 'rgba(130,142,161,1)',
  'x-3-bg': 'rgba(36,160,245,1)',
  'x-3-bd': 'rgba(36,160,245,1)',
  'x-3-cl': 'rgba(36,160,245,1)',
  'y-1-bg': 'rgba(29,38,53,1)',
  'y-1-bd': 'rgba(29,38,53,1)',
  'y-1-cl': 'rgba(29,38,53,1)',
  'y-2-bg': 'rgba(41,52,72,1)',
  'y-2-bd': 'rgba(41,52,72,1)',
  'y-2-cl': 'rgba(41,52,72,1)',
  'y-3-bg': 'rgba(11,20,35,1)',
  'y-3-bd': 'rgba(11,20,35,1)',
  'y-3-cl': 'rgba(11,20,35,1)',
  'y-4-bg': 'rgba(26,39,60,1)',
  'y-4-bd': 'rgba(26,39,60,1)',
  'y-4-cl': 'rgba(26,39,60,1)',
  'y-5-bg': 'rgba(36,160,245,1)',
  'y-5-bd': 'rgba(36,160,245,1)',
  'y-5-cl': 'rgba(36,160,245,1)',
  'z-1-bg': 'rgba(237,244,248,1)',
  'z-1-bd': 'rgba(237,244,248,1)',
  'z-1-cl': 'rgba(237,244,248,1)',
  'z-2-bg': 'rgba(90,102,121,1)',
  'z-2-bd': 'rgba(90,102,121,1)',
  'z-2-cl': 'rgba(90,102,121,1)',
  'u-1-bg': 'rgba(19,184,135,1)',
  'u-1-bd': 'rgba(19,184,135,1)',
  'u-1-cl': 'rgba(19,184,135,1)',
  'u-2-bg': 'rgba(19,184,135,0.3)',
  'u-2-bd': 'rgba(19,184,135,0.3)',
  'u-2-cl': 'rgba(19,184,135,0.3)',
  'u-3-bg': 'rgba(19,184,135,0.15)',
  'u-3-bd': 'rgba(19,184,135,0.15)',
  'u-3-cl': 'rgba(19,184,135,0.15)',
  'u-4-bg': 'rgba(235,77,92,1)',
  'u-4-bd': 'rgba(235,77,92,1)',
  'u-4-cl': 'rgba(235,77,92,1)',
  'u-5-bg': 'rgba(235,77,92,0.3)',
  'u-5-bd': 'rgba(235,77,92,0.3)',
  'u-5-cl': 'rgba(235,77,92,0.3)',
  'u-6-bg': 'rgba(235,77,92,0.15)',
  'u-6-bd': 'rgba(235,77,92,0.15)',
  'u-6-cl': 'rgba(235,77,92,0.15)',
  'u-7-bg': 'rgba(0,0,0,0.5)',
  'u-7-bd': 'rgba(0,0,0,0.5)',
  'u-7-cl': 'rgba(0,0,0,0.5)',
  'u-8-bg': 'rgba(36,160,245,1)',
  'u-8-bd': 'rgba(36,160,245,1)',
  'u-8-cl': 'rgba(36,160,245,1)',
  'u-9-bg': 'rgba(36,160,245,0.3)',
  'u-9-bd': 'rgba(36,160,245,0.3)',
  'u-9-cl': 'rgba(36,160,245,0.3)',
  'u-10-bg': 'rgba(36,160,245,0.15)',
  'u-10-bd': 'rgba(36,160,245,0.15)',
  'u-10-cl': 'rgba(36,160,245,0.15)',
  'u-11-bg': 'rgba(130,142,161,1)',
  'u-11-bd': 'rgba(130,142,161,1)',
  'u-11-cl': 'rgba(130,142,161,1)',
  'u-12-bg': 'rgba(130,142,161,0.3)',
  'u-12-bd': 'rgba(130,142,161,0.3)',
  'u-12-cl': 'rgba(130,142,161,0.3)',
  'u-13-bg': 'rgba(130,142,161,0.15)',
  'u-13-bd': 'rgba(130,142,161,0.15)',
  'u-13-cl': 'rgba(130,142,161,0.15)',
  'u-14-bg': 'rgba(255,255,255,0.15)',
  'u-14-bd': 'rgba(255,255,255,0.15)',
  'u-14-cl': 'rgba(255,255,255,0.15)',
  'u-15-bg': 'rgba(0,0,0,0.15)',
  'u-15-bd': 'rgba(0,0,0,0.15)',
  'u-15-cl': 'rgba(0,0,0,0.15)',
  'u-16-bg': 'rgba(255,255,255,1)',
  'u-16-bd': 'rgba(255,255,255,1)',
  'u-16-cl': 'rgba(255,255,255,1)',
};
window.colorMap = defaultColor;
