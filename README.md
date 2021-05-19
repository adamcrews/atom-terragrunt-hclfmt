# atom-terragrunt-hclfmt package

Format hcl source code with `terragrunt hclfmt`.

Since hclfmt is no longer maintained, we'll use the terragrunt version of it, built into terragrunt

This atom package was forked and updated from: https://github.com/chrw/atom-hclfmt

## Requirements
- terragrunt: https://terragrunt.gruntwork.io/

## Configuration
```json
"atom-terragrunt-hclfmt":
  binPath: "terragrunt"
  fmtOnSave: true
```
