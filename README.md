# PIQUE Visualizer
A React app used to visualize PIQUE results. In a hierachical tree display, the quality scores from\
PIQUE results are much easier to understand than trying to parse through complicated json files.

# Using the Visualizer

### File Upload
PIQUE Visualizer accepts the compact json version of PIQUE results. These compact outputs are created by running\
original PIQUE results through an algorithm that reduces parent-child relationship redundancy, and significantly\
reduces the size of the json file while preserving the results.

<img src="https://github.com/MSUSEL/msusel-pique-visualizer/blob/main/public/PIQUE-Visualizer-Pictures/file_upload.png" width="60%">

---

### Initial Display
Upon submitting the compact output of PIQUE, its results will be displayed on the screen. The results\
are displayed in a hierarchical tree structure that shows how the software quality score was created.

<img src="https://github.com/MSUSEL/msusel-pique-visualizer/blob/main/public/PIQUE-Visualizer-Pictures/initial_display.png" width="60%">

---

### Viewing Children
Clicking on an applicable node (rectangle), its children and their respective edges will display on\
the screen. If these children are not already visible, they will be put into view. The edge weights will\
be shown along the edge.

<img src="https://github.com/MSUSEL/msusel-pique-visualizer/blob/main/public/PIQUE-Visualizer-Pictures/show_children.PNG" width="60%">

---

### Viewing Parents
Clicking on the circle in the top left corner of a node will display its edges to the node's parents.\
The edge weights will be shown along the edge.

<img src="https://github.com/MSUSEL/msusel-pique-visualizer/blob/main/public/PIQUE-Visualizer-Pictures/show_parents.png" width="60%">

---

### Information Panel
Clicking on the square in the top right corner of a node will display more information about the node in\
a side panel. Depending on what type of node it is will determine which information is shown, however almost\
all nodes will show a quality impact score showing how much they are bringing the total quality score down.

<img src="https://github.com/MSUSEL/msusel-pique-visualizer/blob/main/public/PIQUE-Visualizer-Pictures/show_side_panel.png" width="60%">

# Setup
Clone this repository to your local machine. You will also need node and npm installed on your computer.\
With the repository in your working directory, use the following commands:

### `npm install`
This will install all of the packages necessary for the visualizer. *Only need to use this command **one time***

### `npm run dev`

Runs the visualizer and opens it in your browser.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run storybook`
Start storybook and open browser.

Funding Agency: [<img src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg" width="20%" height="20%">](https://www.cisa.gov/)
