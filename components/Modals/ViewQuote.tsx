import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useModalStore, useThemeStore } from "../../store";

const { Viewer, Worker } = require("@react-pdf-viewer/core");
const { defaultLayoutPlugin } = require("@react-pdf-viewer/default-layout");
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface ViewQuote {
  viewQuote: boolean;
  setViewQuote: (arg: boolean) => void;
  url: string;
}

export default function ViewQuote({ url, viewQuote, setViewQuote }: ViewQuote) {
  // ? Client state definitions
  const handleClose = useModalStore((state) => state.toggle);
  const theme = useThemeStore((state) => state.theme);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Modal open={viewQuote} onClose={() => setViewQuote(false)}>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          left: "50%",
          overflow: "hidden",
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          zIndex: "9999",
          outline: 0,
        }}
      >
        {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js"> */}
        <Worker
          workerUrl={`${process.env.API}/public/libraries/reactPDFviewer/pdf.worker.min.js`}
        >
          <div style={{ height: "70vh" }}>
            <Viewer
              fileUrl={url}
              theme={theme.palette.mode}
              plugins={[defaultLayoutPluginInstance]}
            />
          </div>
        </Worker>
      </Box>
    </Modal>
  );
}
