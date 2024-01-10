import { Box, Button, Callout } from "@radix-ui/themes";
import { InfoCircledIcon, FileTextIcon, ButtonIcon } from "@radix-ui/react-icons";
import { useFileUpload } from "./use-file-uploader";
import * as schema from "../../data/schema";
import { useSetAtom } from "jotai";
import { State } from "../../state";


export interface FileUploaderProps { }

export const FileUploader = () => {
  const [_, selectFile] = useFileUpload();
  const setDataset = useSetAtom(State.dataset);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg" alt="CISA Logo" width="100" height="100" style={{ marginRight: '20px' }} />
        <h1>PIQUE Visualizer</h1>
        <img src="https://raw.githubusercontent.com/MSUSEL/msusel-pique-visualizer/refactorZiyi/src/assets/PIQUE_svg.svg" alt="PIQUE Logo" width="100" height="100" style={{ marginLeft: '20px' }} />
      </div>


      <Callout.Root
        size="2">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Please upload the PIQUE JSON file to visualize the results
        </Callout.Text>
      </Callout.Root>

      <Button
        size="4"
        variant="surface"
        radius="large"
        onClick={() => {
          selectFile({ accept: ".json", multiple: false }, ({ file }) => {
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
        <FileTextIcon /> Select File
      </Button>

    </div>
  );
};
