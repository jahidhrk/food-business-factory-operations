# Application architecture

## Request flow

1. Sites authenticates the visitor and injects identity headers.
2. The server-only authentication helper obtains a stable user ID.
3. The operations route loads that owner's D1 workspace.
4. The workflow engine validates the selected demo role and requested action.
5. The engine applies a change to a cloned state. Failed operations do not mutate the input.
6. The route updates the workspace only if its version still matches. Conflicts return HTTP 409.
7. The client uses the returned persisted state and version.

## Data entities

- Record: typed form data, status, production batch, revision, attachments and history.
- Lot: material/product, supplier, manufacturing/expiry dates, quantity, unit, location, source and disposition.
- Batch: product, planned quantity, schedule, raw inputs, rework parents and release status.
- Movement: signed inventory quantity tied to its source record, batch and customer.
- Audit: selected demo actor, timestamp, action and note.
- Master: materials, products, suppliers, customers, equipment, locations and recipe references.

## Posting rules

- Receiving approval creates released raw-material inventory only after its recorded checks pass.
- Planning approval creates a unique batch.
- Material issue approval checks lot state, expiry, unit and aggregate availability, then deducts stock and records genealogy.
- NC submission holds the affected batch and its finished goods.
- NC approval records the chosen disposition; approved rework can be allocated only within its authorized quantity.
- FG receipt requires all configured batch checks, an approved packing transfer, a permitted quantity and no previous receipt of that transfer.
- Dispatch approval checks vehicle/hygiene and label results, released unexpired FG inventory, batch holds and aggregate available quantity, then posts customer-linked stock movements.

## Security and demonstration scope

Every operational API request requires platform identity. Records and R2 keys are scoped to that identity. Mutating routes check request origin. The state engine validates department permissions on the server. The operations API validates the published demo username and password before selecting a role; an incoming role field cannot override the authenticated demo account. The owner can sign out and log in with another demo account. Demo IDs share one showcase password and the platform owner workspace.

The demo is designed for exploration, not audited production operation. Expand employee identity, independent approval checks, validated specifications, retention policy, normalized data, backups and load testing before rollout.
