import { Flex, Button, Callout, Strong } from "@radix-ui/themes";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { InfoCircledIcon, FileTextIcon } from "@radix-ui/react-icons";
import { useFileUpload } from "./use-file-uploader";
import * as schema from "../../data/schema";
import { useSetAtom } from "jotai";
import { State } from "../../state";
import React, { useState } from "react";
import "./AlertDialog.css"


export interface FileUploaderProps { }

interface ValidationErrorIssue {
  code: string;
  expected?: any;
  received?: any;
  path: (string | number)[];
  message: string;
  unionErrors?: { issues: ValidationErrorIssue[]; name: string }[];
}

export const FileUploader = () => {
  const [_, selectFile] = useFileUpload();
  const setDataset = useSetAtom(State.dataset);
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState('');

  const generateErrorSummary = (issues: ValidationErrorIssue[], fileName: string): string => {
    const issueCounts: Record<string, number> = {};

    const countIssues = (issues: ValidationErrorIssue[]) => {
      issues.forEach(issue => {
        issueCounts[issue.code] = (issueCounts[issue.code] || 0) + 1;
        if (issue.unionErrors) {
          issue.unionErrors.forEach(unionError => {
            countIssues(unionError.issues);
          });
        }
      });
    };

    countIssues(issues);

    let summary = `The uploaded JSON file (${fileName}) contains the following issues:\n`;
    Object.keys(issueCounts).forEach(code => {
      const issueCount = issueCounts[code];
      summary += `\n ${issueCount} ${code} issue${issueCount > 1 ? 's' : ''}.\n`;
    });

    return summary;
  };

  const resetAndSelectFile = () => {
    setErrorMessage("");
    setErrorDetails("");
    setFileName("");
  };

  const handleFileSelect = () => {
    selectFile({ accept: ".json", multiple: false }, ({ file }: { file: File }) => {
      const currentFileName = file.name; // Use a local variable to capture the file name
      setFileName(currentFileName); // Still set the state for any other uses outside this callback
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const result = e.target?.result;
        try {
          const parsed = JSON.parse(result as string);
          const validationResult = schema.base.dataset.safeParse(parsed);

          if (validationResult.success) {
            setDataset(validationResult.data);
            setErrorMessage("");
          } else {
            // Use the local variable directly when generating the summary
            const errorSummary = generateErrorSummary(validationResult.error.issues, currentFileName);
            const errorDetails = JSON.stringify(validationResult.error.issues, null, 2);
            setErrorDetails(errorDetails);
            setErrorMessage(errorSummary);
          }
        } catch (error) {
          console.error("Error reading the file", error);
          setErrorMessage("An error occurred while reading the file.");
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
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="AlertDialogOverlay" />
            <AlertDialog.Content className="AlertDialogContent">
              <AlertDialog.Title className="AlertDialogTitle">Error Validating File</AlertDialog.Title>
              <AlertDialog.Description className="AlertDialogDescription">
                {errorMessage.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}

              </AlertDialog.Description>

              <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-between' }}>
                <AlertDialog.Cancel asChild>
                  <Button className="Button mauve" onClick={resetAndSelectFile}>
                    Cancel, select another file
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button className="Button red" onClick={downloadErrorDetails}>
                    Click to download the entire error log
                  </Button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        )}
      </AlertDialog.Root>

    </div>
  );
};
