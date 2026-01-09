"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

export default function SccQrScanner({
  onScan,
  onClose,
}: {
  onScan: (value: string) => void;
  onClose: () => void;
}) {
  const qrRef = useRef<Html5Qrcode | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const container = document.getElementById("qr-reader");
    if (container) {
      container.innerHTML = "";
    }

    const qr = new Html5Qrcode("qr-reader");
    qrRef.current = qr;

    qr.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      async (decodedText) => {
        onScan(decodedText);

        if (qrRef.current?.isScanning) {
          try {
            await qrRef.current.stop();
          } catch {}
        }

        try {
          qrRef.current?.clear();
        } catch {}

        qrRef.current = null;
        onClose();
      },
      () => {}
    );

    return () => {
      startedRef.current = false;

      if (qrRef.current?.isScanning) {
        try {
          qrRef.current.stop();
        } catch {}
      }

      try {
        qrRef.current?.clear();
      } catch {}

      qrRef.current = null;

      const container = document.getElementById("qr-reader");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [onScan, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 w-full max-w-md">
        <div
          id="qr-reader"
          className="w-full aspect-square rounded-lg overflow-hidden"
        />

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-slate-900 text-white py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
