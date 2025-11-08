'use client';

import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

type PDFViewerProps = {
  fileUrl: string;
};

export function PDFViewer({ fileUrl }: PDFViewerProps) {
  // Must be created at the top level, not inside another Hook
  const defaultLayout = defaultLayoutPlugin();

  return (
    <Worker workerUrl="/pdf.worker.min.js">
      <div className="bg-white">
        <div className="flex justify-center px-2 py-4 sm:px-4">
          <div className="w-full">
            <Viewer fileUrl={fileUrl} plugins={[defaultLayout]} />
          </div>
        </div>
      </div>
    </Worker>
  );
}


