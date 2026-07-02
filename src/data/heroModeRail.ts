/** Mode Rail — KeyMod + phone → wireless tools on the target. */

export type HeroModeRailStation = {
  id: string;
  label: string;
  tease: string;
  iconSrc: string;
  iconAlt: string;
};

export const heroModeRailStations: HeroModeRailStation[] = [
  {
    id: 'keyboard',
    label: 'Keyboard',
    tease: 'Type on the target. BIOS-ready.',
    iconSrc: '/keymod/rebirth/hero/rail/keyboard.webp',
    iconAlt: 'Wireless keyboard on the target',
  },
  {
    id: 'mouse',
    label: 'Mouse',
    tease: 'Wireless trackpad on the target',
    iconSrc: '/keymod/rebirth/hero/rail/basic.webp',
    iconAlt: 'Wireless mouse and trackpad',
  },
  {
    id: 'gamepad',
    label: 'Gamepad',
    tease: 'Phone as a game controller',
    iconSrc: '/keymod/rebirth/hero/rail/play.webp',
    iconAlt: 'Game controller mode',
  },
  {
    id: 'macro',
    label: 'Macro',
    tease: 'One tap runs the whole script',
    iconSrc: '/keymod/rebirth/hero/rail/macro.webp',
    iconAlt: 'Macro and shortcut keypad',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    tease: 'Terminal over BLE / USB cable',
    iconSrc: '/keymod/rebirth/hero/rail/ops.webp',
    iconAlt: 'Terminal on the target monitor',
  },
  {
    id: 'slides',
    label: 'Slides',
    tease: 'Phone as your presentation remote',
    iconSrc: '/keymod/rebirth/hero/rail/slides.webp',
    iconAlt: 'Presentation remote',
  },
  {
    id: 'network',
    label: 'Network',
    tease: 'Network bridge from your phone (on the roadmap)',
    iconSrc: '/keymod/rebirth/hero/rail/network.webp',
    iconAlt: 'USB-Ethernet cable, network bridge',
  },
  {
    id: 'ai-chat',
    label: 'Agent',
    tease: 'LLM plans it. You approve, KeyMod acts.',
    iconSrc: '/keymod/rebirth/hero/rail/ai-chat.webp',
    iconAlt: 'Agent Mode on KeyCmd',
  },
  {
    id: 'and-more',
    label: 'And More',
    tease: 'MIDI, audio, CLI + MCP on the firmware roadmap',
    iconSrc: '/keymod/rebirth/hero/rail/and-more.webp',
    iconAlt: 'More modes on the KeyMod roadmap',
  },
];
