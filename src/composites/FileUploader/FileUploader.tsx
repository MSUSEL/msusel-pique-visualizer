import { Flex, Button, Callout, Dialog } from "@radix-ui/themes";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { InfoCircledIcon, FileTextIcon } from "@radix-ui/react-icons";
import { useFileUpload } from "./use-file-uploader";
import * as schema from "../../data/schema";
import { useSetAtom } from "jotai";
import { State } from "../../state";
import React, { useState } from "react";


export interface FileUploaderProps { }

export const FileUploader = () => {
  const [_, selectFile] = useFileUpload();
  const setDataset = useSetAtom(State.dataset);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState('');

  const handleFileSelect = () => {
    selectFile({ accept: ".json", multiple: false }, ({ file }) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const result = e.target?.result;
        try {
          const parsed = JSON.parse(result as string);
          const validationResult = schema.base.dataset.safeParse(parsed);

          if (validationResult.success) {
            setDataset(validationResult.data);
            setErrorMessage(""); // Reset error message on success
            // Optionally, close the dialog if you have a state to control its visibility
          } else {
            // Prepare and display error summary and details
            const errorSummary = "Validation failed. Please check the error log for more details.";
            const errorDetails = JSON.stringify(validationResult.error.issues, null, 2);
            setErrorDetails(errorDetails);
            setErrorMessage(errorSummary);
            // Show the dialog with errors
          }
        } catch (error) {
          console.error("Error reading the file", error);
          setErrorMessage("An error occurred while reading the file.");
          // Show the dialog with error
        }
      };
      fileReader.readAsText(file);
    });
  };



  const downloadErrorDetails = () => {
    const blob = new Blob([errorDetails], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'errorDetails.json';
    link.click();
    URL.revokeObjectURL(url);
  };



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

      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button size="4" variant="surface" radius="large" onClick={handleFileSelect}>
            <FileTextIcon /> Select File
          </Button>
        </AlertDialog.Trigger>

        {errorMessage && (
          <AlertDialog.Content style={{ maxWidth: 450, padding: '16px', borderRadius: '6px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <AlertDialog.Title>Error Validating File</AlertDialog.Title>
            <AlertDialog.Description>
              {errorMessage}
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel asChild>
                <Button variant="soft" color="gray">
                  Close
                </Button>
              </AlertDialog.Cancel>
              <Button variant="solid" color="red" onClick={downloadErrorDetails}>
                Click to download the entire error log
              </Button>
            </Flex>
          </AlertDialog.Content>
        )}
      </AlertDialog.Root>

      {/*
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
                  setErrorMessage(""); // Reset error message on success
                } else {
                  // Log the detailed error messages
                  console.error("Validation failed", validationResult.error.issues);
                  setErrorMessage("Validation failed. Please check the console for more details.");
                }
              } catch (e) {
                console.error("Error reading the file", e);
                setErrorMessage("An error occurred while reading the file.");
              }
            };
            fileReader.readAsText(file);
          });
        }}
      >
        <FileTextIcon /> Select File
      </Button>
*/}
    </div>
  );
};
