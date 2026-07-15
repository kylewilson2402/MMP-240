import type { LucideIcon } from "lucide-react";
import { CircleDot, Gauge, Goal, Swords, Target, Zap } from "lucide-react";

export interface SignatureStat {
  label: string;
  value: string;
}

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  tagline: string;
  era: string;
  signatureStat: SignatureStat;
  bio: string[];
  accent: {
    from: string;
    to: string;
  };
  /** Lucide icon used for the duotone portrait placeholder */
  icon: LucideIcon;
}

export const athletes: Athlete[] = [
  {
    id: "jordan",
    name: "Michael Jordan",
    sport: "Basketball",
    tagline: "Gravity was a suggestion, not a rule.",
    era: "1984 – 2003",
    signatureStat: { label: "NBA Championships", value: "6" },
    bio: [
      "He entered the league as a leaper and left it as a language. Every kid who has ever hung in the air a beat too long, tongue out, arm cocked, is speaking Jordan's dialect, whether they know his name or not.",
      "What separated him wasn't the vertical — it was the refusal. Refusal to lose Game 7s, refusal to let a flu slow a Finals clincher, refusal to let anyone else write the ending. Six trips to the Finals, six rings, zero doubt.",
      "The Bulls didn't just win with him; they became mythology. Chicago in the '90s was a red-and-black fever dream, and he was the one dictating the temperature.",
    ],
    accent: { from: "#CE1141", to: "#0A0A0A" },
    icon: CircleDot,
  },
  {
    id: "senna",
    name: "Ayrton Senna",
    sport: "Formula 1",
    tagline: "On a given day, given circumstance, a man can achieve the perfect lap.",
    era: "1984 – 1994",
    signatureStat: { label: "World Championships", value: "3" },
    bio: [
      "Senna drove like the track owed him something. In the rain at Donington in 1993, he made faster cars disappear in his mirrors lap by lap, a masterclass delivered in a language only he seemed fluent in.",
      "He treated qualifying as a spiritual exercise — pole positions weren't collected, they were confessed. Sixty-five of them, most from a man who believed the car and the driver could, for one lap, become a single uninterrupted thought.",
      "Imola took him in 1994, but it never took the myth. Brazil still stops for him. The yellow helmet is still, decades on, the shorthand for total commitment.",
    ],
    accent: { from: "#009739", to: "#FEDD00" },
    icon: Gauge,
  },
  {
    id: "serena",
    name: "Serena Williams",
    sport: "Tennis",
    tagline: "I really think a champion is defined not by their wins but by how they can recover.",
    era: "1995 – 2022",
    signatureStat: { label: "Grand Slam Singles Titles", value: "23" },
    bio: [
      "She didn't just win majors, she reorganized the sport around her serve. Opponents didn't prepare to beat Serena Williams; they prepared to survive her.",
      "Twenty-three Grand Slam singles titles, earned across three different decades, against three different generations of challengers who grew up trying to solve a puzzle she kept rewriting.",
      "Off the court, the same ferocity built a business empire and a template for what an athlete's second act could look like. Compton to Wimbledon to boardrooms — the throughline was always the same refusal to be small.",
    ],
    accent: { from: "#7B1FA2", to: "#F5C400" },
    icon: Target,
  },
  {
    id: "ali",
    name: "Muhammad Ali",
    sport: "Boxing",
    tagline: "Float like a butterfly, sting like a bee.",
    era: "1960 – 1981",
    signatureStat: { label: "Heavyweight Titles", value: "3x" },
    bio: [
      "He was faster than heavyweights were supposed to be and louder than champions were supposed to act, and both were the point. Ali didn't just fight opponents; he narrated their defeat in advance, in rhyme.",
      "The Rumble in the Jungle wasn't a boxing match so much as a philosophy demonstrated live — rope-a-dope as patience turned into weapon, Foreman's power spent punching at a man who simply wasn't there anymore by round eight.",
      "He gave up years of his prime rather than his principles, and came back anyway to reclaim the title three separate times. The gift was the boxing. The legacy was the refusal.",
    ],
    accent: { from: "#C8102E", to: "#1A1A1A" },
    icon: Swords,
  },
  {
    id: "bolt",
    name: "Usain Bolt",
    sport: "Athletics",
    tagline: "I don't think about the risks much. I just think about what I'm trying to achieve.",
    era: "2002 – 2017",
    signatureStat: { label: "100m World Record", value: "9.58s" },
    bio: [
      "At the 2009 Berlin World Championships, he ran a hundred meters faster than anyone in human history ever had, then did it again over two hundred, and made both look like a formality.",
      "Eight Olympic gold medals came with a showman's ease — the chest-thump before the finish line, the To-Di-World pose that became shorthand for Jamaican sprinting itself.",
      "He turned a discipline built on ruthless margins into theater, and somehow the theater never slowed him down. The record still stands. Nobody's been close.",
    ],
    accent: { from: "#009B3A", to: "#FED100" },
    icon: Zap,
  },
  {
    id: "messi",
    name: "Lionel Messi",
    sport: "Football",
    tagline: "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
    era: "2004 – Present",
    signatureStat: { label: "Ballon d'Or Awards", value: "8" },
    bio: [
      "Barcelona's academy took in a boy who needed growth-hormone treatment just to keep playing, and produced the player most of his peers now call the best they've ever shared a pitch with.",
      "Eight Ballons d'Or is a number that shouldn't exist — a gap so wide over the rest of the field that comparisons stopped being useful years ago. What he does with a football at low speed, in a phone booth of space, still doesn't look physically reasonable.",
      "Qatar 2022 gave him the one line missing from the resume. A World Cup, delivered at 35, on a stage built for a storybook ending he then went and wrote himself.",
    ],
    accent: { from: "#75AADB", to: "#A50044" },
    icon: Goal,
  },
];
