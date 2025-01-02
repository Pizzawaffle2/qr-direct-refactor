// src/components/calendar/calendar-export.tsx
'use client';

import React, { useState } from 'react';
import { useRef } from 'react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/Label';
import { Switch } from '@/components/UI/Switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import { Progress } from '@/components/UI/progress';
import { Card } from '@/components/UI/Card';
import { CalendarTheme, ExportOptions } from '@/types/calendar';
import { Download, Printer, Share2, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CalendarExportProps {
  calendarRef: React.RefObject<HTMLDivElement>;
  theme: CalendarTheme;
  title: string;
}

export function CalendarExport({ calendarRef, theme, title }: CalendarExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    quality: 'high',
    includeCover: true,
    optimizeForPrinting: true,
    paperSize: 'a4',
    orientation: 'landscape'
  });

  const paperSizes = {
    a4: { width: 210, height: 297 },
    letter: { width: 216, height: 279 },
    a3: { width: 297, height: 420 }
  };

  const handleExport = async () => {
    if (!calendarRef.current) return;
    setIsExporting(true);
    setProgress(0);

    try {
      // Start progress
      setProgress(20);

      // Create canvas from the calendar element
      const canvas = await html2canvas(calendarRef.current, {
        scale: exportOptions.quality === 'high' ? 2 : 1,
        useCORS: true,
        backgroundColor: theme.colors.background,
      });

      setProgress(60);

      if (exportOptions.format === 'png') {
        // Export as PNG
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${title || 'calendar'}.png`;
        link.href = dataUrl;
        link.click();
      } else if (exportOptions.format === 'pdf') {
        // Export as PDF
        const { width, height } = paperSizes[exportOptions.paperSize];
        const pdf = new jsPDF({
          orientation: exportOptions.orientation,
          unit: 'mm',
          format: exportOptions.paperSize
        });

        // Add cover page if selected
        if (exportOptions.includeCover) {
          pdf.setFillColor(theme.colors.background);
          pdf.rect(0, 0, width, height, 'F');
          pdf.setTextColor(theme.colors.text);
          pdf.setFontSize(24);
          pdf.text(title, width / 2, height / 4, { align: 'center' });
          pdf.addPage();
        }

        // Add calendar
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        
        // Save the PDF
        pdf.save(`${title || 'calendar'}.pdf`);
      } else if (exportOptions.format === 'ics') {
        // Handle iCalendar export
        // This would need additional implementation for event data
        console.log('iCal export not implemented yet');
      }

      setProgress(100);
    } catch (error) {
      console.error('Export failed:', error);
      // Handle error state
    } finally {
      setIsExporting(false);
      setProgress(0);
    }
  };

  const handlePrint = () => {
    if (!calendarRef.current) return;
    window.print();
  };

  const handleShare = async () => {
    if (!calendarRef.current) return;
    try {
      const canvas = await html2canvas(calendarRef.current);
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });

      if (navigator.share) {
        await navigator.share({
          title: title || 'Calendar',
          files: [new File([blob], 'calendar.png', { type: 'image/png' })]
        });
      } else {
        // Fallback for browsers that don't support native sharing
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'calendar.png';
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label>Format</Label>
          <div className="flex gap-2">
            <Button
              variant={exportOptions.format === 'pdf' ? 'default' : 'outline'}
              onClick={() => setExportOptions(prev => ({ ...prev, format: 'pdf' }))}
              className="flex-1"
            >
              PDF
            </Button>
            <Button
              variant={exportOptions.format === 'png' ? 'default' : 'outline'}
              onClick={() => setExportOptions(prev => ({ ...prev, format: 'png' }))}
              className="flex-1"
            >
              PNG
            </Button>
            <Button
              variant={exportOptions.format === 'ics' ? 'default' : 'outline'}
              onClick={() => setExportOptions(prev => ({ ...prev, format: 'ics' }))}
              className="flex-1"
            >
              iCalendar
            </Button>
          </div>
        </div>

        {exportOptions.format === 'pdf' && (
          <>
            <div className="space-y-2">
              <Label>Paper Size</Label>
              <Select
                value={exportOptions.paperSize}
                onValueChange={(value) => 
                  setExportOptions(prev => ({ 
                    ...prev, 
                    paperSize: value as 'a4' | 'letter' | 'a3' 
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="letter">Letter</SelectItem>
                  <SelectItem value="a3">A3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Orientation</Label>
              <div className="flex gap-2">
                <Button
                  variant={exportOptions.orientation === 'portrait' ? 'default' : 'outline'}
                  onClick={() => setExportOptions(prev => ({ 
                    ...prev, 
                    orientation: 'portrait' 
                  }))}
                  className="flex-1"
                >
                  Portrait
                </Button>
                <Button
                  variant={exportOptions.orientation === 'landscape' ? 'default' : 'outline'}
                  onClick={() => setExportOptions(prev => ({ 
                    ...prev, 
                    orientation: 'landscape' 
                  }))}
                  className="flex-1"
                >
                  Landscape
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <div>
            <Label>Include Cover Page</Label>
            <p className="text-sm text-gray-500">Add a title page to the calendar</p>
          </div>
          <Switch
            checked={exportOptions.includeCover}
            onCheckedChange={(checked) => 
              setExportOptions(prev => ({ ...prev, includeCover: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Optimize for Printing</Label>
            <p className="text-sm text-gray-500">
              Adjust colors and patterns for better print quality
            </p>
          </div>
          <Switch
            checked={exportOptions.optimizeForPrinting}
            onCheckedChange={(checked) => 
              setExportOptions(prev => ({ ...prev, optimizeForPrinting: checked }))
            }
          />
        </div>
      </div>

      {isExporting && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-gray-500">Exporting calendar...</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handlePrint}
          className="flex-1"
          disabled={isExporting}
        >
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button
          variant="outline"
          onClick={handleShare}
          className="flex-1"
          disabled={isExporting}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button
          onClick={handleExport}
          className="flex-1"
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Export
        </Button>
      </div>
    </div>
  );
}

export default CalendarExport;