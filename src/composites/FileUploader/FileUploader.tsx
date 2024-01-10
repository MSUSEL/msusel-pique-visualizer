import { Box, Button } from "@radix-ui/themes";
import { useFileUpload } from "./use-file-uploader";
import * as schema from "../../data/schema";
import { useSetAtom } from "jotai";
import { State } from "../../state";

export interface FileUploaderProps {}

export const FileUploader = () => {
  const [_, selectFile] = useFileUpload();
  const setDataset = useSetAtom(State.dataset);
  return (
    <Box>
      <Button
        onClick={() => {
          selectFile({ accept: "json", multiple: false }, ({ file }) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
              const result = e.target?.result;

              try {
                const parsed = JSON.parse(result as string);
                const validationResult = schema.base.dataset.safeParse(parsed);

                if (validationResult.success) {
                  setDataset(validationResult.data);
                } else {
                  // error
                }
              } catch (e) {
                //error
              }
            };
            fileReader.readAsText(file);
          });
        }}
      >
        Select File
      </Button>
    </Box>
  );
};
