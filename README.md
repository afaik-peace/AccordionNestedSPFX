

# accordion-from-library-spfx

## Summary

![accordionSPFX](https://github.com/user-attachments/assets/3f111732-d17e-4709-9e3d-5068420c1b4b)

Watch on Youtube: https://www.youtube.com/watch?v=iueG1jCY1Ec


## Used SharePoint Framework Version

![version]([https://img.shields.io/badge/version-1.19.0-green.svg](https://github.com/afaik-peace/AccordionNestedSPFX/blob/main/accordion%20thumbnail.png))

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

>SharePoint Online

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve** (to test in workbench)

    **Deployment**
  - gulp build
  - gulp bundle --ship
  - gulp package-solution --ship

**Steps**:
1. Create Document Library
2. Add Link to Document content type
3. Add the following columns:
- **Icon** (choice column) choices =PDF
Word
Excel
PowerPoint
Video
Audio
Image
Archive
Code
Text

- **FontAwesomeIconClass** (calculated column with formula
  
=IF(Icon="PDF","fas fa-file-pdf",IF(Icon="Word","fas fa-file-word",IF(Icon="Excel","fas fa-file-excel",IF(Icon="PowerPoint","fas fa-file-powerpoint",IF(Icon="Video","fas fa-file-video",IF(Icon="Audio","fas fa-file-audio",IF(Icon="Image","fas fa-file-image",IF(Icon="Archive","fas fa-file-archive",IF(Icon="Code","fas fa-file-code",IF(Icon="Text","fas fa-file-alt"))))))))))

- **Sequence** with default value =ZZZ
- **Target** (choice column) with choices
  _blank (make this default value)
_self
_parent
_top

4. Create and upload css file. sample css below
   .accordion {
    /* Remove border */
    border: none; 
    border-radius: 8px; /* Soft rounded corners */
    width: 100%; /* Adjust as needed */
}

.accordionItem {
    /* Remove borders */
    border: none;
    position: relative; /* For positioning child items */
    margin-bottom: 2px; /* Add bottom margin for whitespace between items */
}

.accordionHeader {
    padding: 15px; /* Increased padding for better touch area */
    cursor: pointer;
    background-color: #0091cb; /* Deep metallic blue for headers */
    color: #fff; /* White text for contrast */
    font-size: 16px; /* Slightly larger font size */
    transition: background-color 0.3s ease; /* Smooth transition */
}

.accordionHeader:hover {
    background-color: #2c6174; /* Darker shade on hover */
}

.accordionHeader.folder {
    font-weight: bold; /* Bold for folder items */
    background-color:#3b7e99;
    margin-bottom: 2px;
}

.accordionHeader.file {
    font-style: italic; /* Italic for file items */
}

.accordionContent {
    display: none; /* Default state */

    /* Remove border */
    border: none; 
    padding: 0px; /* Optional padding for content */
}

.accordionItem > .accordionContent > .accordionItem {
    margin-bottom: 2px; /* Remove margins to eliminate gaps */
    padding-left: 20px; /* Indent sub-nodes */

}

.accordionHeader a {
    text-decoration: none; /* Remove underline */
    color: inherit; /* Inherit color from the header */
    margin-left: auto; /* Align links to the right */
}

*/.accordionHeader a::before {
    content: "•"; /* Bullet character */
    position: absolute; /* Position it absolutely */
    left: 10px; /* Align it to the left with spacing */
    color: #ffcc00; /* Gold color for bullets */
}

