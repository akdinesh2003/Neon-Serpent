
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export const speeds = {
  slow: 250,
  normal: 150,
  fast: 75,
};
export type Speed = keyof typeof speeds;

export const themes = [
  {
    name: 'Neon Green',
    id: 'neon-green',
    colors: {
      background: '240 10% 3.9%',
      foreground: '0 0% 98%',
      primary: '120 100% 50%',
      accent: '300 100% 50%',
      border: '120 100% 20%',
      ring: '120 100% 50%',
    },
  },
  {
    name: 'Cyber Pink',
    id: 'cyber-pink',
    colors: {
      background: '300 10% 3.9%',
      foreground: '0 0% 98%',
      primary: '320 100% 60%',
      accent: '180 100% 50%',
      border: '320 100% 20%',
      ring: '320 100% 60%',
    },
  },
  {
    name: 'Electric Blue',
    id: 'electric-blue',
    colors: {
      background: '220 15% 5%',
      foreground: '0 0% 98%',
      primary: '210 100% 60%',
      accent: '0 100% 60%',
      border: '210 100% 20%',
      ring: '210 100% 60%',
    },
  },
  {
    name: 'Solar Flare',
    id: 'solar-flare',
    colors: {
      background: '30 15% 5%',
      foreground: '0 0% 98%',
      primary: '50 100% 50%',
      accent: '0 100% 50%',
      border: '50 100% 20%',
      ring: '50 100% 50%',
    },
  },
];

export type Theme = typeof themes[0];

interface GameSettingsProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  speed: Speed;
  onSpeedChange: (speed: Speed) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function GameSettings({
  children,
  open,
  onOpenChange,
  speed,
  onSpeedChange,
  theme,
  onThemeChange,
}: GameSettingsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
          <DialogDescription>
            Customize your game experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-3">
            <Label className="font-semibold">Speed</Label>
            <RadioGroup
              value={speed}
              onValueChange={(value) => onSpeedChange(value as Speed)}
              className="grid grid-cols-3 gap-2"
            >
              {Object.keys(speeds).map((s) => (
                <div key={s}>
                  <RadioGroupItem
                    value={s}
                    id={`speed-${s}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`speed-${s}`}
                    className={cn(
                      'block w-full cursor-pointer rounded-md border-2 border-muted bg-popover p-3 text-center capitalize hover:bg-accent hover:text-accent-foreground',
                      speed === s && 'border-primary'
                    )}
                  >
                    {s}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <Label className="font-semibold">Theme</Label>
            <RadioGroup
              value={theme.id}
              onValueChange={(id) => {
                const newTheme = themes.find((t) => t.id === id);
                if (newTheme) {
                  onThemeChange(newTheme);
                }
              }}
              className="grid grid-cols-2 gap-2"
            >
              {themes.map((t) => (
                <div key={t.id}>
                  <RadioGroupItem
                    value={t.id}
                    id={`theme-${t.id}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`theme-${t.id}`}
                    className={cn(
                      'block cursor-pointer rounded-md border-2 border-muted bg-popover p-3 text-center capitalize hover:bg-accent hover:text-accent-foreground',
                      theme.id === t.id && 'border-primary'
                    )}
                  >
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-4 w-4 rounded-full" style={{backgroundColor: `hsl(${t.colors.primary})`}}/>
                        <div className="h-4 w-4 rounded-full" style={{backgroundColor: `hsl(${t.colors.accent})`}}/>
                    </div>
                    <span className="mt-2 block text-sm">{t.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
