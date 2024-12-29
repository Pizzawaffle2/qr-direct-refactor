'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/Label';
import Switch from '@/components/UI/Switch';
import { Progress } from '@/components/UI/progress';
import { CALENDAR_THEMES } from '@/types/calendar-themes';
import { Download, Printer, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportOptions {
  filename: string;
  format: 'pdf' | 'png';
  quality: 'high' | 'medium' | 'draft';
  includeCover: boolean;
  optimizeForPrinting: boolean;
  paperSize: 'a4' | 'letter' | 'a3';
  orientation: 'portrait' | 'landscape';
}

interface CalendarExportProps {
  calendarRef: React.RefObject<HTMLDivElement>;
  theme: typeof CALENDAR_THEMES;
  title: string;
}

export function CalendarExport({ calendarRef, theme, title }: CalendarExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<ExportOptions>({
    filename: title || 'calendar',
    format: 'pdf',
    quality: 'high',
    includeCover: true,
    optimizeForPrinting: true,
    paperSize: 'a4',
    orientation: 'portrait',
  });

  const paperSizes = {
    a4: { width: 210, height: 297 },
    letter: { width: 216, height: 279 },
    a3: { width: 297, height: 420 },
  };

  const exportCalendar = async () => {
    if (!calendarRef.current) return;
    setIsExporting(true);
    setProgress(0);

    try {
      setProgress(20);

      const canvas = await html2canvas(calendarRef.current, {
        scale: options.quality === 'high' ? 2 : 1,
        useCORS: true,
        backgroundColor: theme[0].colors.background,
      });

      setProgress(60);

      if (options.format === 'png') {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${options.filename}.png`;
        link.href = dataUrl;
        link.click();
      } else {
        const { width, height } = paperSizes[options.paperSize];
        const pdf = new jsPDF({
          orientation: options.orientation,
          unit: 'mm',
          format: options.paperSize,
        });

        if (options.includeCover) {
          pdf.setFillColor(theme[0].colors.background);
          pdf.rect(0, 0, width, height, 'F');
          pdf.setTextColor(theme[0].colors.text);
          pdf.setFontSize(24);
          pdf.text(title, width / 2, height / 4, { align: 'center' });
          pdf.addPage();
        }

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        pdf.save(`${options.filename}.pdf`);
      }

      setProgress(100);
      toast.success(`Calendar exported as ${options.format.toUpperCase()}`);
    } catch (error) {
      console.error('Export failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred.';
      toast.error(`Export failed: ${errorMessage}`);
    } finally {
      setIsExporting(false);
      setProgress(0);
    }
  };

  const handlePrint = () => {
    if (!calendarRef.current) return;
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="filename">Filename</Label>
          <Input
            id="filename"
            value={options.filename}
            onChange={(e) => setOptions((prev) => ({ ...prev, filename: e.target.value }))}
            placeholder="Enter filename"
          />
        </div>

        <div className="space-y-2">
          <Label>Format</Label>
          <div className="flex gap-2">
            <Button
              variant={options.format === 'pdf' ? 'default' : 'outline'}
              onClick={() => setOptions((prev) => ({ ...prev, format: 'pdf' }))}
              className="flex-1"
            >
              PDF
            </Button>
            <Button
              variant={options.format === 'png' ? 'default' : 'outline'}
              onClick={() => setOptions((prev) => ({ ...prev, format: 'png' }))}
              className="flex-1"
            >
              PNG
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SwitchSetting
          label="Optimize for Printing"
          description="Adjust colors and patterns for better print quality"
          checked={options.optimizeForPrinting}
          onChange={(checked) => setOptions((prev) => ({ ...prev, optimizeForPrinting: checked }))}
        />

        <SwitchSetting
          label="Include Cover Page"
          description="Add a title page to the calendar"
          checked={options.includeCover}
          onChange={(checked) => setOptions((prev) => ({ ...prev, includeCover: checked }))}
        />
      </div>

      {isExporting && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-muted-foreground">Exporting calendar...</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={handlePrint} className="flex-1">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button onClick={exportCalendar} disabled={isExporting} className="flex-1">
          {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          Export
        </Button>
      </div>
    </div>
  );
}

interface SwitchSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SwitchSetting: React.FC<SwitchSettingProps> = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>{label}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch isChecked={checked} onChange={onChange} />
    </div>
  );
};