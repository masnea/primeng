import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'context-menu-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>TreeTable has exclusive integration with ContextMenu using the <i>contextMenu</i> event to open a menu on right click alont with <i>contextMenuSelection</i> properties to control the selection via the menu.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast [style]="{ marginTop: '80px' }" />
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [columns]="cols" dataKey="name" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header let-columns>
                        <tr>
                            <th *ngFor="let col of columns">
                                {{ col.header }}
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
                        <tr [ttRow]="rowNode" [ttContextMenuRow]="rowNode">
                            <td *ngFor="let col of columns; let i = index">
                                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                                {{ rowData[col.field] }}
                            </td>
                        </tr>
                    </ng-template>
                </p-treetable>
            </p-deferred-demo>
            <p-contextmenu #cm [model]="items" />
        </div>
        <app-code [code]="code" selector="tree-table-context-menu-demo"></app-code>
    `,
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuDoc {
    files!: TreeNode[];

    selectedNode!: TreeNode;

    cols!: Column[];

    items!: MenuItem[];

    constructor(
        private nodeService: NodeService,
        private messageService: MessageService
    ) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedNode) },
            { label: 'Toggle', icon: 'pi pi-sort', command: (event) => this.toggleFile(this.selectedNode) }
        ];
    }

    viewFile(node: any) {
        this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.data.name + ' - ' + node.data.size });
    }

    toggleFile(node: any) {
        node.expanded = !node.expanded;
        this.files = [...this.files];
    }

    code: Code = {
        basic: `<p-toast [style]="{ marginTop: '80px' }" />

<p-treetable [value]="files" [columns]="cols" dataKey="name" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" [ttContextMenuRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>

<p-contextmenu #cm [model]="items" />`,

        html: `<div class="card">
    <p-toast [style]="{ marginTop: '80px' }" />

    <p-treetable [value]="files" [columns]="cols" dataKey="name" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template #header let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode" [ttContextMenuRow]="rowNode">
                <td *ngFor="let col of columns; let i = index">
                    <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>
    </p-treetable>

    <p-contextmenu #cm [model]="items" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-context-menu-demo',
    templateUrl: './tree-table-context-menu-demo.html',
    standalone: true,
    imports: [TreeTableModule, ToastModule, ContextMenuModule, CommonModule],
    providers: [MessageService, NodeService]
})
export class TreeTableContextMenuDemo implements OnInit{
    files!: TreeNode[];

    selectedNode!: TreeNode;

    cols!: Column[];

    items!: MenuItem[];

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedNode) },
            { label: 'Toggle', icon: 'pi pi-sort', command: (event) => this.toggleFile(this.selectedNode) }
        ];
    }

    viewFile(node: any) {
        this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.data.name + ' - ' + node.data.size });
    }

    toggleFile(node: any) {
        node.expanded = !node.expanded;
        this.files = [...this.files];
    }
}`,

        service: ['NodeService']
    };
}
