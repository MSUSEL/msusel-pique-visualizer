import "./TopHeader.css"
//import NodeRiskColor from "../treeNode/NodeColorHelper";


// pop up window controllers
// TODO: Change to handle all buttons 
/* uncomment this after the bug is fixed

document.addEventListener("DOMContentLoaded",() =>{
    const button = document.querySelector(".main-button")
    button.addEventListener("click", handleClick)
})

function handleClick(event){
    const modal = document.querySelector(".modal")
    const closeBtn = document.querySelector(".close")
    modal.style.display = "block";
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    })
}
*/
// class btn controls the pop up for the color changer
// class modal will allow the user to change which colors they want

// TODO: Give each button a value

export function TopHeader() {
    return (
        <>          
            
            

            <div className="display-4" id="PIQUE_name">
                    PIQUE Visualizer
            </div>
        </>
    )
}










/* add this back into the top header function once the bug is fixed
<div class="btn">
                <button class="main-button" onClick={(event) => handleClick(event)}>Color Changer</button>
            </div>

            <div class="modal">
                <div class="modal_content">
                    <span class="close" >&times;</span>
                    <h1>Change the colors</h1>
                    <button class="color-btn">Change Severe Color</button>
                    <button class="color-btn">Change High Color</button>
                    <button class="color-btn">Change Elevated Color</button>
                    <button class="color-btn">Change Gaurded Color</button>
                    <button class="color-btn">Change Low Color</button>
                </div>
            </div>
 */          