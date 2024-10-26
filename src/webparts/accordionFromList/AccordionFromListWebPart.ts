import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IAccordionFromListWebPartProps } from './IAccordionFromListWebPartProps';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import '@fortawesome/fontawesome-free/css/all.css';
import './defaultStyles.css';



interface AccordionItem {
    name: string;
    title?: string;
    children: AccordionItem[];
    isFolder: boolean;
    url?: string;
    id: string;
    sequence?: string;
    target?: string;
    iconClass?: string; // Add iconClass property
}

interface SharePointItem {
    FileLeafRef: string;
    FileDirRef: string;
    FSObjType: number;
    FileRef: string;
    Id: number;
    Sequence?: string;
    Target?: string;
    Title?: string;
    FontAwesomeIconClass?: string; // Include FontAwesomeIconClass
}

export default class AccordionFromListWebPart extends BaseClientSideWebPart<IAccordionFromListWebPartProps> {
    private itemsFetched: SharePointItem[] = [];

    public render(): void {
        const { siteUrl, libraryName, cssUrl } = this.properties;

        if (!siteUrl || !libraryName) {
            this.domElement.innerHTML = `
                <div style="color: blue; font-size:16px;">
                    Please add a valid Site URL and Library Name in the web part properties.
                </div>`;
            return;
        }

        if (cssUrl) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssUrl;
            document.head.appendChild(link);
        }

        const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${libraryName}')/items?$top=5000&$select=FileLeafRef,FileDirRef,FSObjType,FileRef,Id,Sequence,Target,Title,FontAwesomeIconClass`;

        this.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => {
                this.itemsFetched = data.value;
                this.renderAccordion();

            })
            .catch(error => {
                console.error('Fetch error:', error);
                this.domElement.innerHTML = `
                    <div style="color: red; font-size:16px;">
                        Error fetching items. Please check your settings.
                    </div>`;
            });
    }



    private buildHierarchy(items: SharePointItem[]): AccordionItem[] {
        const hierarchy: AccordionItem[] = [];
        const basePath = items[0]?.FileDirRef || "";

        items.forEach(item => {
            const itemId = `idAccordionItem${item.Id}`;
            const pathParts = item.FileDirRef.replace(basePath, "").split('/').filter(Boolean);
            const itemName = item.FileLeafRef.replace(/\.[^/.]+$/, "");
            const isFolder = item.FSObjType === 1;
            const itemUrl = item.FSObjType === 0 ? item.FileRef : "#";
            let currentLevel = hierarchy;

            pathParts.forEach((part: string, index: number) => {
                let existingNode = currentLevel.find((node: AccordionItem) => node.name === part);
                if (!existingNode) {
                    existingNode = { name: part, title: '', children: [], isFolder: index < pathParts.length - 1, id: '', sequence: '', target: '', iconClass: '' };
                    currentLevel.push(existingNode);
                }
                currentLevel = existingNode.children;
            });

            if (!currentLevel.find((node: AccordionItem) => node.name === itemName)) {
                currentLevel.push({
                    name: itemName,
                    title: item.Title || itemName,
                    children: [],
                    isFolder,
                    url: itemUrl,
                    id: itemId,
                    sequence: item.Sequence || "zzz",
                    target: item.Target || "_self",
                    iconClass: item.FontAwesomeIconClass || "" // Fetch icon class
                });
            }
        });

        return hierarchy;
    }

    private generateAccordionHtml(nodes: AccordionItem[]): string {
        function createAccordionItems(nodes: AccordionItem[]): string {
            return nodes.map((node: AccordionItem) => {
                let html = `<div class="accordionItem" id="${node.id}" name="${node.sequence}">`;
                if (node.isFolder) {
                    html += `<div class="accordionHeader folder">${node.title}</div>`;
                    if (node.children.length) {
                        html += `<div class="accordionContent" style="display: none;">${createAccordionItems(node.children)}</div>`;
                    }
                } else {
                    html += `<div class="accordionHeader file"><a href="${node.url}" target="${node.target}" data-interception="off">`;
                    if (node.iconClass) {
                        html += `<i class="${node.iconClass}"></i> `; // Add the icon here
                    }
                    html += `${node.title}</a></div>`;
                }
                html += '</div>';
                return html;
            }).join('');
        }

        return `<div class="accordion">${createAccordionItems(nodes)}</div>`;
    }

    private renderAccordion(): void {
        const nodes = this.buildHierarchy(this.itemsFetched);
        const accordionHtml = this.generateAccordionHtml(nodes);
        this.domElement.innerHTML = accordionHtml;
        this.initializeAccordion();
        this.orderFirstLevelHeaders();
    }

    private orderFirstLevelHeaders(): void {
        const accordionItems = Array.from(document.querySelectorAll('.accordion .accordionItem'));

        accordionItems.sort((a, b) => {
            const sequenceA = a.getAttribute('name') || 'zzz';
            const sequenceB = b.getAttribute('name') || 'zzz';
            return sequenceA.localeCompare(sequenceB);
        }).forEach(item => {
            const parent = item.parentElement;
            if (parent) {
                parent.appendChild(item);
            }
        });
    }

    private initializeAccordion(): void {
        this.domElement.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const header = target.closest('.accordionHeader.folder');

            if (header) {
                const content = header.nextElementSibling as HTMLElement;
                if (content) {
                    const isExpanded = content.style.display === 'block';
                    content.style.display = isExpanded ? 'none' : 'block';
                    header.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
                    content.classList.toggle('active', !isExpanded);
                }
            }
        });
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: "Accordion Settings"
                    },
                    groups: [
                        {
                            groupName: "Webpart properties",
                            groupFields: [
                                PropertyPaneTextField('siteUrl', {
                                    label: "Site URL",
                                    description: "Enter the URL of the SharePoint site."
                                }),
                                PropertyPaneTextField('libraryName', {
                                    label: "Library Name",
                                    description: "Enter the name of the SharePoint library."
                                }),
                                PropertyPaneTextField('cssUrl', {
                                    label: "CSS File URL",
                                    description: "Enter the URL to a CSS file."
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }
}
