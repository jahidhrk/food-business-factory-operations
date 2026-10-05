# Source form coverage and digital data dictionary

Source: CCF_000653.pdf, 19 pages. Page 1 is the process flow. The following 18 form types cover pages 2–19. Planning and material issue are explicit digital extensions.

## Material Receiving Report

- Source: page 2
- Reference: REC/QC-004
- Department: receiving
- Record entry: receiving, qc
- Review: qc
- Retention note: 2 years (source)
- Batch link: not required

Record deliveries and lot-level inspection before material release.

Posting: Approval adds each material lot to released inventory.

### Delivery details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Raw material type | select | Yes | Meat; Non-Meat; Packaging; Chemical; Others |
| Material name | text | Yes |  |
| Specification number | text | No |  |
| Receiving date | date | Yes |  |
| PO number | text | No |  |
| Challan number | text | No |  |
| Receiving number | text | No |  |
| Supplier / source | text | Yes |  |
| QC inspector | text | No |  |
| Truck / car number | text | No |  |
| Sampling number | text | No |  |
| Storage location | text | Yes |  |

### Material lots (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Lot number | text | Yes |  |
| Manufacturing date | date | Yes |  |
| Expiry date | date | Yes |  |
| Quantity | number | Yes |  |
| Unit | select | Yes | kg; g; pack; pcs; L |
| Arrival temperature 1 (C) | number | No |  |
| Arrival temperature 2 (C) | number | No |  |
| Arrival temperature 3 (C) | number | No |  |
| Arrival temperature 4 (C) | number | No |  |

### Inspection results (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Criterion | text | Yes |  |
| Standard / specification | text | No |  |
| Sample 1 | text | No |  |
| Sample 2 | text | No |  |
| Sample 3 | text | No |  |
| Sample 4 | text | No |  |
| Sample 5 | text | No |  |
| Sample 6 | text | No |  |
| Sample 7 | text | No |  |
| Sample 8 | text | No |  |
| Sample 9 | text | No |  |
| Sample 10 | text | No |  |
| Sample 11 | text | No |  |
| Sample 12 | text | No |  |
| Sample 13 | text | No |  |
| Conforming | select | Yes | Yes; No; N/A |

### Disposition

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Quantity check | select | Yes | On PO required; Less than actual; Other |
| Actual quantity | number | No |  |
| Quality result | select | Yes | Pass; Not pass; Not tested; N/A |
| Recommendation | textarea | No |  |
| NC lot number | text | No |  |
| NC quantity | number | No |  |
| NC characteristic | textarea | No |  |
| Action required | select | Yes | None; Hold with card; Rejected; Conform for use |
| Hold card number | text | No |  |
| Results after action | textarea | No |  |
| Reported by | text | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Fresh Vegetable Cleaning Record

- Source: page 3
- Reference: REC/QC-037
- Department: production
- Record entry: production, qc
- Review: qc
- Retention note: 6 months (source)
- Batch link: required

Record washing, solution preparation and cleaning checks.

### Cleaning session

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Date | date | Yes |  |

### Vegetable cleaning entries (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Receiving date | date | Yes |  |
| Vegetable type | text | Yes |  |
| Source lot | text | No |  |
| First rinse with water | select | Yes | Yes; No; N/A |
| Water (L) | number | No |  |
| NaHCO3 (g) | number | No |  |
| NaHCO3 PDD code | text | No |  |
| Solution checked by | text | No |  |
| Dipping observation 1 | text | No |  |
| Dipping observation 2 | text | No |  |
| Dipping observation 3 | text | No |  |
| Dipping observation 4 | text | No |  |
| Dipping observation 5 | text | No |  |
| Dipping observation 6 | text | No |  |
| Deviation note | textarea | No |  |
| Second rinse with water | select | Yes | Yes; No; N/A |
| Label PDD | date | No |  |
| Best before | text | No |  |
| Remark | textarea | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Sieving Report

- Source: page 4
- Reference: REC/PX-008
- Department: production
- Record entry: production
- Review: production, qc
- Retention note: 6 months (source)
- Batch link: required

Capture material weight, sieve checks and foreign-material findings.

### Preparation details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Date | date | Yes |  |
| Scale code | text | No |  |
| Location | select | Yes | Premix preparation; Flour preparation; Test room; Other |

### Sieving entries (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Product code | text | No |  |
| Product / raw material | text | Yes |  |
| PDD | date | No |  |
| Source lot | text | Yes |  |
| Weight before sieving (g) | number | Yes |  |
| Weight after sieving (g) | number | Yes |  |
| Sieve condition before | select | Yes | Pass; Not pass; Not tested; N/A |
| Sieve condition after | select | Yes | Pass; Not pass; Not tested; N/A |
| Corrective action | textarea | No |  |
| Foreign material found | select | Yes | Yes; No; N/A |
| Foreign material details | textarea | No |  |
| Remarks | textarea | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Premix Checking Report

- Source: page 5
- Reference: REC/PX-009
- Department: production
- Record entry: production
- Review: production, qc
- Retention note: 6 months (source)
- Batch link: required

Verify premix pack weights, labels and seals.

### Check details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Date | date | Yes |  |
| Balance code | text | No |  |

### Premix observations (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Production code / name | text | Yes |  |
| Premix number | text | Yes |  |
| Standard weight (g) | number | Yes |  |
| Total packs produced | number | Yes |  |
| Labelling | select | Yes | Pass; Not pass; Not tested; N/A |
| Weight observation 1 (g) | number | No |  |
| Weight observation 2 (g) | number | No |  |
| Weight observation 3 (g) | number | No |  |
| Weight observation 4 (g) | number | No |  |
| Weight observation 5 (g) | number | No |  |
| Sealing | select | Yes | Pass; Not pass; Not tested; N/A |
| Lot / batch number | text | Yes |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Premix Preparation Monitoring Form

- Source: page 6
- Reference: REC/PX-002
- Department: production
- Record entry: production
- Review: production
- Retention note: 6 months (source)
- Batch link: required

Versioned recipe ingredients and preparation checks for each premix batch.

### Preparation details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Product name | text | Yes |  |
| Product code | text | No |  |
| Recipe batch size (kg) | number | Yes |  |
| Number of sets | number | Yes |  |
| Date | date | Yes |  |
| Time | time | No |  |
| Recipe version | text | No |  |

### Ingredients and target quantities (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Premix code | text | Yes |  |
| Ingredient name | text | Yes |  |
| Target weight (g) | number | Yes |  |
| Ingredient lot | text | No |  |
| Ingredient expiry | date | No |  |
| Remark | textarea | No |  |

### Batch preparation checks (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Premix code | text | Yes |  |
| Ingredient name | text | Yes |  |
| Prepared batch number | text | Yes |  |
| Actual weight (g) | number | Yes |  |
| Preparation verified | select | Yes | Pass; Not pass; Not tested; N/A |
| Checked by | text | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Water & Swab Testing Report

- Source: page 7
- Reference: REC/LAB-005
- Department: laboratory
- Record entry: laboratory
- Review: qc
- Retention note: 1 year (source)
- Batch link: not required

Microbial and chemical results for water, staff or equipment samples.

### Sample information

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Sample from | select | Yes | Machine / Equipment SWAB; Staff SWAB; Water; Other |
| Other source | text | No |  |
| Sample receiving date | date | Yes |  |
| Sample collection date | date | Yes |  |
| Collected by | text | No |  |
| Analyzed by | text | Yes |  |
| Analysis date | date | Yes |  |

### Microbial test results (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Sample number | text | Yes |  |
| Source / product name | text | Yes |  |
| Unit (CFU per cm2 or ml) | text | No |  |
| TPC | text | No |  |
| Coliform | text | No |  |
| E. coli | text | No |  |
| S. aureus | text | No |  |
| Listeria sp. | text | No |  |
| Approved standard reference | text | No |  |
| Conclusion | select | Yes | Pass; Not pass; Not tested; N/A |
| Correction needed | select | Yes | Yes; No; N/A |

### Chemical test results (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Sample number | text | No |  |
| Source name | text | No |  |
| Hardness standard (ppm) | text | No |  |
| Hardness actual (ppm) | text | No |  |
| DO standard (ppm) | text | No |  |
| DO actual (ppm) | text | No |  |
| pH standard | text | No |  |
| pH actual | text | No |  |
| TDS standard (ppm) | text | No |  |
| TDS actual (ppm) | text | No |  |
| Other parameter | text | No |  |
| Other standard | text | No |  |
| Other actual | text | No |  |

### Corrective action

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Recommended corrective action | textarea | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Production Report: Meat Grinding

- Source: page 8
- Reference: REC/QC-035
- Department: production
- Record entry: production, qc
- Review: qc
- Retention note: 1 year (source)
- Batch link: required

Track input meat, grinding settings and measured temperatures.

### Production details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Production date | date | Yes |  |
| Shift | select | Yes | Day; Night |

### Grinding entries (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Start time | time | No |  |
| Debone meat date | date | No |  |
| Use for | text | No |  |
| Source lot | text | Yes |  |
| Meat input (kg) | number | Yes |  |
| Plate diameter (mm) | number | No |  |
| Temperature after grinding (C) | number | Yes |  |
| Grinding meat code | text | No |  |
| QC sign | text | No |  |
| Remark | textarea | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## NC Use & Balance Record

- Source: page 9
- Reference: REC/QC-014
- Department: qc
- Record entry: qc, production
- Review: qc
- Retention note: 3 months (source)
- Batch link: required

Track authorized rework quantities and the destination batch.

Posting: Links source and destination batches; rejects overuse of approved rework.

### Record details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Date | date | Yes |  |

### Rework consumption (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Time | time | No |  |
| Approved NC record ID | text | Yes |  |
| Source batch | text | Yes |  |
| NC product code | text | No |  |
| NC product name | text | Yes |  |
| NC production date | date | No |  |
| Available quantity (kg) | number | No |  |
| Quantity used (kg) | number | Yes |  |
| Destination product | text | Yes |  |
| Destination production date | date | No |  |
| Destination batch | text | Yes |  |
| Balance (kg) | number | No |  |
| Recorded by | text | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Sausage Mixing & Linking Inspection

- Source: page 10
- Reference: REC/QC-051
- Department: production
- Record entry: production, qc
- Review: qc
- Retention note: 1 year (source)
- Batch link: required

Capture formulation inputs, silent-cutter settings and linking checks.

### Production details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Product name | text | Yes |  |
| Thermometer ID | text | No |  |
| Balance ID | text | No |  |
| Production date | date | Yes |  |
| Shift | select | Yes | Day; Night |

### Silent cutter / ingredient inputs (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Batch number | text | Yes |  |
| Start time | time | No |  |
| Finish time | time | No |  |
| Speed | number | No |  |
| Ingredient | text | Yes |  |
| Recipe quantity (kg) | number | No |  |
| Actual quantity (kg) | number | Yes |  |
| Source lot | text | Yes |  |
| DD / actual date | date | No |  |
| Temperature (C) | number | No |  |

### Auto-linking and dimensional checks (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Batch number | text | Yes |  |
| Start time | time | No |  |
| Finish time | time | No |  |
| Casing code | text | No |  |
| Horn number | text | No |  |
| Length (cm) | number | No |  |
| Diameter (mm) | number | No |  |
| Weight (g) | number | No |  |
| Approved size specification | text | No |  |
| Remarks | textarea | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Nonconforming Product Report

- Source: page 11
- Reference: REC/QC-021
- Department: qc
- Record entry: qc, production, warehouse
- Review: qc
- Retention note: 1 year (source)
- Batch link: required

Hold affected batches and record an authorized disposition.

Posting: Submitting places the batch on hold. QC disposition controls release, rework or rejection.

### Nonconformance details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Product name | text | Yes |  |
| Product code | text | No |  |
| Report date | date | Yes |  |
| Time | time | No |  |
| Location | text | No |  |
| Stage | select | Yes | Raw material; Work in process; Finished goods; Return |
| Occurrence | select | Yes | During storage; During preparation; Other |
| Production date | date | No |  |
| Return date | date | No |  |
| Affected material lot | text | No |  |
| QC operator | text | No |  |

### Corrective action (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| NC characteristic | textarea | No |  |
| Affected quantity (kg) | number | Yes |  |
| Disposition | select | Yes | Hold; Release after correction; Approved rework; Scrap / reject |
| Correction method | textarea | No |  |
| Rework product | text | No |  |
| Destination batch | text | No |  |
| Correction finished on | date | No |  |
| Discard slip number | text | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Finished Product Sample Analysis

- Source: page 12
- Reference: REC/LAB-012
- Department: laboratory
- Record entry: laboratory
- Review: qc
- Retention note: 1 year (source)
- Batch link: required

Record finished-product microbiological and pH results.

### Sample details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Customer | text | No |  |
| Sample description | text | Yes |  |
| Sample type | text | Yes |  |
| Sample condition | text | No |  |
| Sample receiving date | date | Yes |  |
| Test start date | date | Yes |  |
| Test completion date | date | Yes |  |
| Analyzed by | text | Yes |  |

### Analysis results (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Test parameter | text | Yes |  |
| Method | text | No |  |
| Approved standard | text | No |  |
| Result | text | Yes |  |
| Unit | text | No |  |
| Conclusion | select | Yes | Pass; Not pass; Not tested; N/A |
| Correction needed | select | Yes | Yes; No; N/A |

### Corrective action

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Recommended corrective action | textarea | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Steam Box Report

- Source: page 13
- Reference: REC/QC-015
- Department: production
- Record entry: production, qc
- Review: qc
- Retention note: 6 months (source)
- Batch link: required

CCP 1B cycle readings, corrective actions and QC verification.

### Cooking cycle

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Product name | text | Yes |  |
| Box number | text | Yes |  |
| Cycle ID | text | Yes |  |
| Date | date | Yes |  |
| Batches in cycle | text | Yes |  |
| Product temperature before steam (C) | number | No |  |
| Input (kg) | number | No |  |
| Output total (kg) | number | No |  |
| Rework / regrade (kg) | number | No |  |
| Showering 1 start | time | No |  |
| Showering 1 finish | time | No |  |
| Showering 2 start | time | No |  |
| Showering 2 finish | time | No |  |
| Approved cooking specification | text | No |  |

### Actual monitoring and corrective actions (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Step time | text | No |  |
| Setting temperature (C) | number | No |  |
| Setting RH (%) | number | No |  |
| Actual time | time | No |  |
| Actual ambient temperature (C) | number | Yes |  |
| Core temperature (C) | number | Yes |  |
| Actual RH (%) | number | No |  |
| Correction CT1 (C) | number | No |  |
| Correction CT2 (C) | number | No |  |
| Correction CT3 (C) | number | No |  |
| Correction 1 pass | select | No | Pass; Not pass; Not tested; N/A |
| Extended cooking time | text | No |  |
| Correction 2 pass | select | No | Pass; Not pass; Not tested; N/A |
| Remark | textarea | No |  |

### Cycle verification

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Cycle result | select | Yes | Pass; Not pass; Not tested; N/A |
| Reheat / corrective action | textarea | No |  |
| QC supervisor | text | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Cutting, Packing, Drying & Cooling

- Source: page 14
- Reference: REC/QC-062
- Department: production
- Record entry: production, qc
- Review: qc
- Retention note: 1 year (source)
- Batch link: required

Track product through drying, cooling, packing and blast freezing.

### Packing session

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Packaging type | select | Yes | Pack brand; Clear pack; Secondary pack |
| Balance ID | text | No |  |
| Thermometer ID | text | No |  |
| Production date | date | Yes |  |
| Shift | select | Yes | Day; Night |

### Process and packing records (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Product name | text | Yes |  |
| Batch / lot | text | Yes |  |
| Drying start | time | No |  |
| Drying finish | time | No |  |
| Before pack core temperature (C) | number | No |  |
| Cooling start | time | No |  |
| Cooling finish | time | No |  |
| Packing time | time | No |  |
| Pack size (g) | number | Yes |  |
| Sticker manufacturing date | date | No |  |
| Sticker expiry date | date | No |  |
| Sticker batch / lot | text | No |  |
| Pack core temperature (C) | number | No |  |
| Weight range per piece (g) | text | No |  |
| Average weight of 3 packs (g) | number | No |  |
| Total packs in batch | number | Yes |  |
| Blast freezing start | time | No |  |
| Blast freezing finish | time | No |  |
| Blast freezing core temperature (C) | number | No |  |
| Handover warehouse core temperature (C) | number | No |  |
| QC sign | text | No |  |
| Remark | textarea | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Metal Detector Report

- Source: page 15
- Reference: REC/QC-046
- Department: qc
- Record entry: qc
- Review: qc
- Retention note: 2 years (source)
- Batch link: required

CCP 2P detector checks, holds and corrective-action rechecks.

### Detector session

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Shift | select | Yes | Day; Night |
| Metal detector number | text | Yes |  |
| Production date | date | Yes |  |
| Approved test-piece specification | text | No |  |

### Detector checks (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Time | time | No |  |
| Product name | text | Yes |  |
| Program number | text | No |  |
| Product code | text | No |  |
| Lot / batch | text | Yes |  |
| Quantity (packs) | number | No |  |
| Fe test | select | Yes | Pass; Not pass; Not tested; N/A |
| Non-Fe test | select | Yes | Pass; Not pass; Not tested; N/A |
| SUS test | select | Yes | Pass; Not pass; Not tested; N/A |
| Test arm reject | select | Yes | Pass; Not pass; Not tested; N/A |
| CA1 holding lot | text | No |  |
| CA1 holding quantity (packs) | number | No |  |
| CA1 recheck date | date | No |  |
| CA2 holding lot | text | No |  |
| CA2 holding quantity (packs) | number | No |  |
| CA2 recheck result | text | No |  |
| NC record date | date | No |  |

### Disposition

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Overall result | select | Yes | Pass; Not pass; Not tested; N/A |
| Corrective action | textarea | No |  |
| CA1 by | text | No |  |
| CA2 by | text | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Temperature Record for Chiller Cabinet

- Source: page 16
- Reference: REC/QC-031
- Department: warehouse
- Record entry: warehouse, qc
- Review: qc
- Retention note: 6 months (source)
- Batch link: not required

Log room and product temperatures with corrective-action follow-up.

### Cabinet details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Cabinet number | text | Yes |  |
| Location | text | Yes |  |
| Approved temperature specification | text | No |  |

### Temperature observations (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Date | date | Yes |  |
| Time | time | No |  |
| Room temperature (C) | number | Yes |  |
| Product core temperature (C) | number | Yes |  |
| Affected lot / batch | text | No |  |
| Corrective action | textarea | No |  |
| Recorded by | text | No |  |
| QC supervisor | text | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Product Packing & Transfer Record

- Source: page 17
- Reference: REC/PD-010
- Department: production
- Record entry: production, planning
- Review: qc
- Retention note: 1 year (source)
- Batch link: required

Reconcile packaging counts and authorize a warehouse transfer.

### Transfer details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Product category | text | No |  |
| Production date | date | Yes |  |

### Product and sticker reconciliation (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Product code | text | No |  |
| Product name | text | Yes |  |
| Pack size | text | Yes |  |
| Batch / lot | text | Yes |  |
| Prepared packs | number | Yes |  |
| Price label | select | No | Yes; No; N/A |
| Free labels | number | No |  |
| More labels needed | number | No |  |
| Labels returned | number | No |  |
| Actual produced packs | number | Yes |  |
| Remark | textarea | No |  |
| Transferred by PD | text | No |  |
| Received by WH | text | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Finished Goods Warehouse Receipt

- Source: page 18
- Reference: REC/WH-006
- Department: warehouse
- Record entry: warehouse
- Review: warehouse
- Retention note: 2 years (source)
- Batch link: required

Receive a released production batch into finished-goods inventory.

Posting: Approval creates FG stock only after required batch checks are approved.

### Receipt details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Date | date | Yes |  |
| Station | text | Yes |  |
| Storage location | text | Yes |  |
| Packing transfer record ID | text | Yes |  |

### Finished goods lots (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Product code | text | No |  |
| Product name | text | Yes |  |
| Size (g) | number | Yes |  |
| Lot number | text | Yes |  |
| Quantity (packs) | number | Yes |  |
| Manufacturing date | date | Yes |  |
| Expiry date | date | Yes |  |
| Delivered by | text | No |  |
| QC checked | text | No |  |
| WH received | text | No |  |
| Time | time | No |  |
| Remarks | textarea | No |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Product Delivery Report

- Source: page 19
- Reference: REC/QC-003
- Department: dispatch
- Record entry: dispatch
- Review: qc
- Retention note: 2 years (source)
- Batch link: not required

Allocate released finished-goods lots to customer deliveries.

Posting: Approval deducts shipped stock and links each lot to its customer.

### Delivery details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Van number | text | Yes |  |
| Date | date | Yes |  |
| Route | text | Yes |  |
| Driver name | text | Yes |  |
| Preparation start | time | No |  |
| Preparation finish | time | No |  |
| Van cleanliness | select | Yes | Clean with no bad smell; Needs correction |
| Cleanliness note | textarea | No |  |
| Vehicle temperature range | select | Yes | -20 to -30 C; 0 to 4 C; 4 to 10 C; Above 10 C |
| Security seal number | text | No |  |
| Ice pack as standard | select | Yes | Yes; No; N/A |
| Ice note | textarea | No |  |
| Delivery staff hygiene | select | Yes | Good / properly dressed; Needs improvement |

### Customer allocations (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Customer name | text | Yes |  |
| Inventory lot ID | text | Yes |  |
| Product name | text | Yes |  |
| Product size | text | No |  |
| Product code | text | No |  |
| Manufacturing date | date | No |  |
| Expiry date | date | No |  |
| Lot number | text | No |  |
| Quantity (packs) | number | Yes |  |
| Label / seal check | select | Yes | Pass; Not pass; Not tested; N/A |
| Product temperature (C) | number | Yes |  |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Production Order

- Source: digital extension
- Reference: DIG/PLAN-001
- Department: planning
- Record entry: planning
- Review: planning
- Retention note: Configure with the factory
- Batch link: not required

Digital extension: schedule an order and create its unique production batch.

Posting: Approval creates a planned production batch.

### Production order

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Batch ID | text | Yes |  |
| Product name | text | Yes |  |
| Product code | text | No |  |
| Target quantity (kg) | number | Yes |  |
| Scheduled date | date | Yes |  |
| Shift | select | Yes | Day; Night |
| Production line | text | Yes |  |
| Recipe version | text | No |  |
| Order reference | text | No |  |
| Priority | select | Yes | Normal; High |

### Material requirements (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Material | text | Yes |  |
| Required quantity | number | Yes |  |
| Unit | select | Yes | kg; g; pack; pcs; L |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Material Issue to Production

- Source: digital extension
- Reference: DIG/WH-001
- Department: warehouse
- Record entry: warehouse
- Review: warehouse
- Retention note: Configure with the factory
- Batch link: required

Digital extension: deduct released raw materials and link them to production.

Posting: Approval deducts stock and records batch input genealogy.

### Issue details

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Issue date | date | Yes |  |
| Issued by | text | No |  |
| Received by production | text | No |  |

### Lot allocations (repeatable rows)

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Inventory lot ID | text | Yes |  |
| Issue quantity | number | Yes |  |
| Unit | select | Yes | kg; g; pack; pcs; L |

### Review and remarks

| Field | Type | Required at submission | Options |
| --- | --- | --- | --- |
| Remarks | textarea | No |  |
| Recorded by | text | No |  |
| Checked by | text | No |  |
| Reviewed by | text | No |  |
| Approved by | text | No |  |

## Process flow mapping

01. **Receive & inspect**: Material, vegetables, flour, premix, casing, packaging and water sources.
02. **Store & prepare**: Cold storage, vegetable cleaning, sieving and premix preparation.
03. **Plan & process**: Issue released lots, grind meat, mix ingredients and link sausage.
04. **Cook & verify**: Showering, steam-box cooking, laboratory tests and deviation control.
05. **Pack & release**: Drying, cooling, peeling/cutting, sealing, metal detection and freezing.
06. **Store & dispatch**: Warehouse receipt, storage monitoring and customer delivery.
