# Schema-Driven Type Generation

This directory contains scripts for generating TypeScript and Python types from JSON Schema definitions.

## Overview

**Source of Truth:**

- JSON Schema: `packages/schemas/booking/v0/booking.schema.json`

**Generated Files:**

- TypeScript: `frontend/fetch-business-onboarding/types/booking.ts`
- Python: `backend/types/booking.py`

## Principles

1. **JSON Schema is the single source of truth** - All type definitions come from the schema
2. **Generated files are disposable** - They should never be manually edited
3. **Regeneration is safe and repeatable** - Run scripts whenever the schema changes
4. **No business logic** - Generated files only represent data shapes

## Prerequisites

### TypeScript Generation

Uses `json-schema-to-typescript` (run via npx, no installation needed)

### Python Generation

Requires a separate Python 3.12 virtual environment for code generation tools.

**One-time setup:**

```bash
# From tools/generate-types/
python3.12 -m venv .venv-codegen
.venv-codegen/bin/pip install -r requirements-codegen.txt
```

**Why Python 3.12?**
The `datamodel-code-generator` package currently has compatibility issues with Python 3.14+. Using Python 3.12 in a separate venv ensures reliable code generation without affecting your main project dependencies.

## Usage

```bash
source .venv-codegen/bin/activate
```

### Generate TypeScript Types

```bash
./tools/generate-types/generate-ts.sh
```

Outputs to: `frontend/fetch-business-onboarding/types/booking.ts`

### Generate Python Types

```bash
./tools/generate-types/generate-py.sh
```

Outputs to: `backend/types/booking.py`

### Generate Both

```bash
./tools/generate-types/generate-ts.sh && ./tools/generate-types/generate-py.sh
```

## Generated File Structure

### TypeScript (`booking.ts`)

```typescript
/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * ...
 */

export interface RestaurantBookingRequest {
  // Generated types here
}
```

### Python (`booking.py`)

```python
"""
AUTO-GENERATED FILE - DO NOT EDIT
...
"""

from pydantic import BaseModel

class RestaurantBookingRequest(BaseModel):
    # Generated types here
```

## Workflow

1. **Modify the schema**: Edit `packages/schemas/booking/v0/booking.schema.json`
2. **Regenerate types**: Run the generation scripts
3. **Commit all changes**: Schema + generated files together
4. **Deploy**: Frontend and backend types stay aligned

## Important Notes

- **DO NOT** manually edit generated files
- **DO** regenerate after any schema changes
- **DO** commit generated files to version control
- **DO** treat generated files as build artifacts that happen to be checked in

## Project Structure

```
tools/generate-types/
└── .venv-codegen               # Virtual environment for codegen scripts (gitignored)
├── generate-ts.sh              # TypeScript generation script
├── generate-py.sh              # Python generation script
├── requirements-codegen.txt    # Python dependencies for code generation
└── README.md                   # This file

packages/schemas/booking/v0/
└── booking.schema.json         # Source of truth JSON Schema

frontend/fetch-business-onboarding/types/
└── booking.ts                  # Generated TypeScript types

backend/types/
└── booking.py                  # Generated Python types

.venv-codegen/                  # Python 3.12 venv for code generation (gitignored)
```

## Extending

To add new schemas:

1. Create a new schema file in `packages/schemas/`
2. Create corresponding generation scripts (use existing scripts as templates)
3. Update this README with new paths
