import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class SelectableRecordCards extends LightningElement {
    @api selectedRecords = [];
    @api unselectedRecords = [];
    @api displayFieldApiName = 'Name';
    @api selectedColor = '#53c4ee';
    @api unselectedColor = '#ecebea';
    @api cardMinWidth = '100';
    @api cardMaxWidth = '200';
    @api cardFontSize = '13';
    @api headerText = 'Select Records';
    @api subHeaderText = 'Click cards to toggle selection';
    @api selectionLocked = false;

    @api currentlySelected = [];
    @api currentlyUnselected = [];
    @api lastToggledId = '';
    @api lastToggledWasSelected = false;

    _selectedIds = new Set();

    connectedCallback() {
        this.initializeSelections();
        this.updateOutputs();
    }

    get allRecordsWithState() {
        const allRecords = [
            ...(this.selectedRecords || []),
            ...(this.unselectedRecords || [])
        ];

        const selColor = this.selectedColor || '#53c4ee';
        const unselColor = this.unselectedColor || '#ecebea';
        const minW = this.cardMinWidth || '100';
        const maxW = this.cardMaxWidth || '200';
        const fontSize = this.cardFontSize || '13';

        return allRecords.map(record => {
            const recordId = record.Id;
            const isSelected = this._selectedIds.has(recordId);
            const displayValue = this.getDisplayValue(record);

            const locked = this.selectionLocked;
            let cardClass = isSelected ? 'card card-selected' : 'card card-unselected';
            if (locked) {
                cardClass += ' card-locked';
            }

            const bgColor = isSelected ? selColor : unselColor;
            const textColor = isSelected ? '#ffffff' : '#3e3e3c';
            const borderColor = isSelected ? selColor : '#c9c7c5';
            const cardStyle = `background-color:${bgColor};color:${textColor};border-color:${borderColor};min-width:${minW}px;max-width:${maxW}px;font-size:${fontSize}px`;

            return {
                key: recordId,
                recordId: recordId,
                displayValue: displayValue,
                isSelected: isSelected,
                cardClass: cardClass,
                cardStyle: cardStyle,
                ariaLabel: `${isSelected ? 'Selected' : 'Unselected'}: ${displayValue}${locked ? ' (locked)' : ''}`
            };
        });
    }

    get hasRecords() {
        return this.allRecordsWithState && this.allRecordsWithState.length > 0;
    }

    initializeSelections() {
        this._selectedIds = new Set();
        if (this.selectedRecords && Array.isArray(this.selectedRecords)) {
            this.selectedRecords.forEach(record => {
                if (record && record.Id) {
                    this._selectedIds.add(record.Id);
                }
            });
        }
    }

    getDisplayValue(record) {
        if (!record || !this.displayFieldApiName) {
            return 'Unknown';
        }
        try {
            const value = record[this.displayFieldApiName];
            return value != null ? String(value) : 'N/A';
        } catch (error) {
            return 'Error';
        }
    }

    handleCardClick(event) {
        if (this.selectionLocked) {
            return;
        }

        const recordId = event.currentTarget.dataset.recordId;
        if (!recordId) {
            return;
        }

        // Create a NEW Set to trigger LWC reactivity (mutation won't re-render)
        const newSelectedIds = new Set(this._selectedIds);
        let wasSelected;
        if (newSelectedIds.has(recordId)) {
            newSelectedIds.delete(recordId);
            wasSelected = false;
        } else {
            newSelectedIds.add(recordId);
            wasSelected = true;
        }
        this._selectedIds = newSelectedIds;

        this.dispatchEvent(
            new FlowAttributeChangeEvent('lastToggledId', recordId)
        );
        this.dispatchEvent(
            new FlowAttributeChangeEvent('lastToggledWasSelected', wasSelected)
        );

        this.updateOutputs();
    }

    updateOutputs() {
        const allRecords = [
            ...(this.selectedRecords || []),
            ...(this.unselectedRecords || [])
        ];

        const selected = [];
        const unselected = [];

        allRecords.forEach(record => {
            if (record && record.Id) {
                if (this._selectedIds.has(record.Id)) {
                    selected.push(record);
                } else {
                    unselected.push(record);
                }
            }
        });

        this.dispatchEvent(
            new FlowAttributeChangeEvent('currentlySelected', selected)
        );
        this.dispatchEvent(
            new FlowAttributeChangeEvent('currentlyUnselected', unselected)
        );
    }
}
