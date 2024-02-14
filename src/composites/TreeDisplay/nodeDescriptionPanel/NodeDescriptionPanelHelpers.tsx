  import "./NodeDescriptionPanel.css";
  import {ExternalLinkIcon} from '@radix-ui/react-icons'

  // import linear from "./linearLine.PNG";
  // import gaussian from "./gaussianLine.PNG";
  // import linear from "../../../assets/linearLine.png";
  // import gaussian from "../../../assets/gaussianLine.png";
  // import gam from "../../../assets/gamLine.png";

  export function determineNodeInfo(node, impacts) {
    const node_type = determineNodeType();

    function determineNodeType() {
      if (node.name.includes("Measure")) return "Measure";
      else if (node.name.includes("Diagnostic")) return "Diagnostic";
      else if (node.name.includes("Category")) return "Product Factor";
      else if (node.name) return "TQI";
      else return "Quality Aspect";
    }

    function getThresholds() {
      const thresholds_array = node.thresholds;
      let thresholds = "";
      for (let i = 0; i < thresholds_array.length; i++) {
        thresholds +=
          (thresholds_array[i] === 0 ? "0" : thresholds_array[i].toFixed(4)) +
          ",";
      }
      thresholds = thresholds.substring(0, thresholds.length - 1);
      return thresholds;
    }

    function getCorrectNumberWithSuffix(num) {
      const last_digit = num % 10;
      switch (last_digit) {
        case 1:
          return "1st";
        case 2:
          return "2nd";
        case 3:
          return "3rd";
        default:
          return last_digit + "th";
      }
    }

    function getQualityImpactScore() {
      if (
        node_type === "Quality Aspect" ||
        node_type === "Product Factor" ||
        node_type === "Measure"
      ) {
        return (
          <div>
            <b>Quality Impact Score: </b>
            {impacts[node_type][node.name].value !== 0 ? (
              <>
                {impacts[node_type][node.name].value.toFixed(4)}
                <i style={{ paddingLeft: "0.5vw" }}>
                  (Ranked{" "}
                  {getCorrectNumberWithSuffix(impacts[node_type][node.name].rank)}{" "}
                  highest of {Object.keys(impacts[node_type]).length} {node_type}
                  s)
                </i>
              </>
            ) : (
              0
            )}
          </div>
        );
      }
    }

    function renderUtilityFunction() {
      if (typeof node.utility_function === 'string') {
        return (
          <div className="info-block" onMouseEnter={() => handleMouseEnter('nodeType')} onMouseLeave={() => handleMouseLeave('nodeType')}>
            <b>Utility Function: </b>
            {node.utility_function} <ExternalLinkIcon width="10" height="10" className="external-link-icon" />
          </div>
        );
      } else {
        return (
          <div className="info-block" onMouseEnter={() => handleMouseEnter('nodeType')} onMouseLeave={() => handleMouseLeave('nodeType')}>
            <b>Utility Function:</b> pique.evaluation.DefaultUtility <ExternalLinkIcon width="10" height="10" className="external-link-icon" />  
          </div>
        );
      }
    }
    

    // change the name of the node when it is created as well as the image associated with gam
    // TO DO: change the height and width to change as the screen size changes
    // TO DO: Test the changes of adding the class name

    // function graphImage() {
    //   if (node.utility_function === "pique.evaluation.DefaultUtility") {
    //     // return <img src={linear} alt="Linear Graph" width={30} height={30} />;
    //     return <span>linear</span>;
    //     //return ( <img src={linear} alt="Linear Graph" width={20} height={20}/> );
    //   } else if (node.utility_function === "evaluator.BinaryUtility") {
    //     // return <img src={linear} alt="Linear Graph" width={30} height={30} />;
    //     return <span>linear</span>;
    //   } else if (node.utility_function === "pique.evaluation.GaussianUtility") {
    //     // return <img src={gaussian} alt="Gaussian Graph" width={40} height={20} />;
    //     return <span>gaussian</span>;
    //   } else if (node.utility_function === "pique.evaluation.GamUtility") {
    //     // return <img src={gam} alt="Gamutility Graph" width={30} height={30} />;
    //     return <span>gam</span>;
    //   }
    // }
    

    return (
      <>
        <div className="node-name">{node.name}</div>
        <div className="node-info">
        <div className="info-block" onMouseEnter={() => handleMouseEnter('nodeType')} onMouseLeave={() => handleMouseLeave('nodeType')}>
            <b>Node Type: </b>
            {node_type} <ExternalLinkIcon width="10" height="10" className="external-link-icon" />
          </div>
          <div className="info-block" onMouseEnter={() => handleMouseEnter('nodeType')} onMouseLeave={() => handleMouseLeave('nodeType')}>
            <b>Value: </b>
            {node.value.toFixed(5)} <ExternalLinkIcon width="10" height="10" className="external-link-icon" />
          </div>
          {node.description !== "" ? (
            <div className="info-block" onMouseEnter={() => handleMouseEnter('nodeType')} onMouseLeave={() => handleMouseLeave('nodeType')}>
              <b>Description: </b>
              {node.description} <ExternalLinkIcon width="10" height="10" className="external-link-icon" />
            </div>
          ) : null}
          {node_type === "Measure" ? (
            <div className="info-block" onMouseEnter={() => handleMouseEnter('nodeType')} onMouseLeave={() => handleMouseLeave('nodeType')}>
              <b>Thresholds: </b>[{getThresholds(node)}] <ExternalLinkIcon width="10" height="10" className="external-link-icon" />
            </div>
          ) : null}
          {node_type === "Diagnostic" ? (
            <div className="info-block" onMouseEnter={() => handleMouseEnter('nodeType')} onMouseLeave={() => handleMouseLeave('nodeType')}>
              <b>Tool: </b>
              {node.toolName} <ExternalLinkIcon width="10" height="10" className="external-link-icon" />
            </div>
          ) : null}
          <div className="info-block" onMouseEnter={() => handleMouseEnter('nodeType')} onMouseLeave={() => handleMouseLeave('nodeType')}>
            <b>Evaluation Strategy: </b>
            {node.eval_strategy} <ExternalLinkIcon width="10" height="10" className="external-link-icon" />
          </div>
          <div className="info-block" onMouseEnter={() => handleMouseEnter('nodeType')} onMouseLeave={() => handleMouseLeave('nodeType')}>
            <b>Normalizer: </b>
            {node.normalizer} <ExternalLinkIcon width="10" height="10" className="external-link-icon" />
          </div>
          <div>
            {renderUtilityFunction()} 
          </div>
          {getQualityImpactScore()} 
        </div>
      </>
    );
  }
