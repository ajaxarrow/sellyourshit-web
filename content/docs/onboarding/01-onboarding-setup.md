---
title: "Onboarding Setup"
order: 1
---

# Onboarding Setup

The first thing sellyoshit asks for on a fresh install is your store
profile. This page walks through the fields it needs and what happens
after you save.

## Needed Fields

The onboarding form only asks for a couple of things — everything else
can be filled in later from Settings.

### Name

Your own name, or whoever's running the shop day to day. Shows up on
receipts and in the backup file metadata.

### Store Name

The name of your closet/store as customers know it. This is what shows
up at the top of the app once onboarding is done.

### Currency

This tracks what currency you wanna use in the app. Default is PHP since I'm Filipino, duh. I figure there will be non-pinoys that will use the platform so I've added other currencies since I'm that thoughtful of y'all.

### Track Closet Items

Checking the **Track Closet Items** checkbox allows you to sell stuff that you already own. By toggling this option, when you sell clothes that are from your closet, they're not included in the capital computation (all sold closet items belong to profit).

## Saving Your Profile

Once the form is filled in, tapping **Get Started** writes your profile
to the local database and takes you straight to your (empty) inventory.
There's no server round-trip — everything lives on-device.

Ready to put something in that empty inventory? See
[Adding an Item](../inventory/02-adding-items.md) next.

![Onboarding profile form](./images/onboarding-setup/step-1-profile-form.png)

## Further Modifications
You can still change this data in Settings under Profile. See the [Settings walkthrough](../settings/01-settings-walkthrough.md) to see how to change these fields.


