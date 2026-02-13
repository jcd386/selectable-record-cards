# Selectable Record Cards

[![Deploy to Salesforce](https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png)](https://githubsfdeploy.herokuapp.com/app/githubdeploy/jcd386/Selectable-Record-Cards?ref=main)

A generic Lightning Web Component for Screen Flows that displays Salesforce records as clickable cards with toggle selection. Works with any SObject type.

## Features

- **Generic SObject support** - works with any Salesforce object (Contact, Account, custom objects, etc.)
- **Two-collection input** - accepts pre-selected and unselected record collections separately
- **Real-time outputs** - currently selected/unselected collections update on every click
- **Customizable colors** - configure selected and unselected card colors via hex values
- **Customizable sizing** - control card min/max width and font size from Flow Builder
- **Lock mode** - disable selection with a loading spinner animation
- **Accessible** - ARIA labels, roles, focus outlines, and pressed states

## Installation

### Option A: One-Click Deploy

Click the "Deploy to Salesforce" button above.

### Option B: SFDX CLI

```bash
git clone https://github.com/jcd386/Selectable-Record-Cards.git
cd Selectable-Record-Cards
sf project deploy start --target-org YOUR_ORG_ALIAS
```

## Usage

1. Add the **Selectable Record Cards** component to a Screen Flow
2. Select the **Object Type** (e.g., Contact, Account)
3. Pass in two record collections:
   - **Selected Records (Input)** - records that start as selected
   - **Unselected Records (Input)** - records that start as unselected
4. Set the **Display Field API Name** (e.g., `Name`, `Email`, `Title`)
5. Use the output variables in subsequent flow elements

### Inputs

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| Selected Records (Input) | `{T[]}` | No | - | Records pre-selected on load |
| Unselected Records (Input) | `{T[]}` | No | - | Records not selected on load |
| Display Field API Name | `String` | Yes | `Name` | API name of the field shown on cards |
| Selected Card Color | `String` | No | `#53c4ee` | Hex color for selected cards |
| Unselected Card Color | `String` | No | `#ecebea` | Hex color for unselected cards |
| Card Min Width (px) | `String` | No | `100` | Minimum card width in pixels |
| Card Max Width (px) | `String` | No | `200` | Maximum card width in pixels |
| Card Font Size (px) | `String` | No | `13` | Font size for card text in pixels |
| Header Text | `String` | No | `Select Records` | Heading above the cards |
| Sub-Header Text | `String` | No | `Click cards to toggle selection` | Helper text below heading |
| Lock Selection | `Boolean` | No | `false` | Disables toggling and shows spinner |

### Outputs

| Property | Type | Description |
|----------|------|-------------|
| Currently Selected Records | `{T[]}` | Collection of currently selected records |
| Currently Unselected Records | `{T[]}` | Collection of currently unselected records |
| Last Toggled Record ID | `String` | ID of the most recently toggled card |
| Last Toggle Was Selected | `Boolean` | `true` if last toggle was a selection |

## Files

| File | Description |
|------|-------------|
| `selectableRecordCards.js` | Component logic with selection state management |
| `selectableRecordCards.html` | Card grid template with accessibility attributes |
| `selectableRecordCards.css` | Card layout, hover effects, lock animation |
| `selectableRecordCards.js-meta.xml` | Flow Screen target config with generic SObject type |

## License

MIT

## Author

[We Summit Mountains](https://wesummitmountains.com)
