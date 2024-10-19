# accordion-from-list-spfx

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

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
  - **gulp serve**

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


