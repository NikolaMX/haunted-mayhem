Add-Type -AssemblyName System.Drawing

function New-Color {
    param(
        [Parameter(Mandatory = $true)][string]$Hex,
        [int]$Alpha = 255
    )

    $base = [System.Drawing.ColorTranslator]::FromHtml($Hex)
    return [System.Drawing.Color]::FromArgb($Alpha, $base.R, $base.G, $base.B)
}

function Get-IconPath {
    param([Parameter(Mandatory = $true)][string]$Spec)

    $relative = ($Spec.TrimStart("/") -replace "/", "\" -replace "\.json$", "_icon_buildbar.png")
    return Join-Path (Get-Location) $relative
}

function Draw-CenteredText {
    param(
        [Parameter(Mandatory = $true)][System.Drawing.Graphics]$Graphics,
        [Parameter(Mandatory = $true)][string]$Text,
        [Parameter(Mandatory = $true)][System.Drawing.Font]$Font,
        [Parameter(Mandatory = $true)][System.Drawing.Brush]$Brush,
        [float]$X,
        [float]$Y,
        [float]$Width,
        [float]$Height
    )

    $size = $Graphics.MeasureString($Text, $Font)
    $textX = $X + (($Width - $size.Width) / 2)
    $textY = $Y + (($Height - $size.Height) / 2)
    $Graphics.DrawString($Text, $Font, $Brush, $textX, $textY)
}

function Draw-Node {
    param(
        [Parameter(Mandatory = $true)][System.Drawing.Graphics]$Graphics,
        [Parameter(Mandatory = $true)][psobject]$Node,
        [int]$X,
        [int]$Y,
        [Parameter(Mandatory = $true)][System.Drawing.Color]$Accent,
        [Parameter(Mandatory = $true)][System.Drawing.Font]$NodeFont,
        [Parameter(Mandatory = $true)][System.Drawing.Font]$BadgeFont
    )

    $cardWidth = 96
    $cardHeight = 106
    $iconSize = 64
    $iconX = $X + 16
    $iconY = $Y + 8

    $background = if ($Node.state -eq "done") { New-Color "#142228" 232 } else { New-Color "#121417" 212 }
    $border = if ($Node.state -eq "done") { $Accent } else { New-Color "#4b555e" }
    $textColor = if ($Node.state -eq "done") { [System.Drawing.Color]::White } else { New-Color "#95a3ae" }
    $badgeColor = if ($Node.state -eq "done") { $Accent } else { New-Color "#3a4650" }

    $bgBrush = [System.Drawing.SolidBrush]::new($background)
    $borderPen = [System.Drawing.Pen]::new($border, 2)
    $textBrush = [System.Drawing.SolidBrush]::new($textColor)
    $badgeBrush = [System.Drawing.SolidBrush]::new($badgeColor)
    $badgeTextBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::Black)

    $Graphics.FillRectangle($bgBrush, $X, $Y, $cardWidth, $cardHeight)
    $Graphics.DrawRectangle($borderPen, $X, $Y, $cardWidth, $cardHeight)

    $iconPath = Get-IconPath -Spec $Node.spec
    if (Test-Path $iconPath) {
        $image = [System.Drawing.Image]::FromFile($iconPath)
        try {
            $Graphics.DrawImage($image, $iconX, $iconY, $iconSize, $iconSize)
        }
        finally {
            $image.Dispose()
        }
    }

    if ($Node.state -ne "done") {
        $overlayBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(160, 18, 20, 24))
        $Graphics.FillRectangle($overlayBrush, $iconX, $iconY, $iconSize, $iconSize)
        $overlayBrush.Dispose()
    }

    if ($Node.badge) {
        $badgeX = $X + 58
        $badgeY = $Y + 5
        $Graphics.FillRectangle($badgeBrush, $badgeX, $badgeY, 30, 14)
        Draw-CenteredText -Graphics $Graphics -Text $Node.badge -Font $BadgeFont -Brush $badgeTextBrush -X $badgeX -Y $badgeY -Width 30 -Height 14
    }

    Draw-CenteredText -Graphics $Graphics -Text $Node.label -Font $NodeFont -Brush $textBrush -X ($X + 3) -Y ($Y + 78) -Width 90 -Height 24

    $bgBrush.Dispose()
    $borderPen.Dispose()
    $textBrush.Dispose()
    $badgeBrush.Dispose()
    $badgeTextBrush.Dispose()
}

function Draw-Branch {
    param(
        [Parameter(Mandatory = $true)][System.Drawing.Graphics]$Graphics,
        [Parameter(Mandatory = $true)][psobject]$Branch,
        [int]$X,
        [int]$Y,
        [int]$Width,
        [Parameter(Mandatory = $true)][System.Drawing.Color]$Accent,
        [Parameter(Mandatory = $true)][System.Drawing.Font]$BranchFont,
        [Parameter(Mandatory = $true)][System.Drawing.Font]$NodeFont,
        [Parameter(Mandatory = $true)][System.Drawing.Font]$BadgeFont
    )

    $branchHeight = 126
    $headerBrush = [System.Drawing.SolidBrush]::new((New-Color "#0f151b" 234))
    $bodyBrush = [System.Drawing.SolidBrush]::new((New-Color "#1a2026" 222))
    $headerPen = [System.Drawing.Pen]::new($Accent, 1)
    $bodyPen = [System.Drawing.Pen]::new((New-Color "#2f3943"), 1)
    $titleBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)

    $Graphics.FillRectangle($headerBrush, $X, $Y, $Width, 26)
    $Graphics.DrawRectangle($headerPen, $X, $Y, $Width, 26)
    $Graphics.FillRectangle($bodyBrush, $X, ($Y + 28), $Width, ($branchHeight - 28))
    $Graphics.DrawRectangle($bodyPen, $X, ($Y + 28), $Width, ($branchHeight - 28))
    $Graphics.DrawString($Branch.name, $BranchFont, $titleBrush, ($X + 10), ($Y + 4))

    $nodes = @($Branch.nodes)
    $count = $nodes.Count
    $cardWidth = 96
    $nodeTop = $Y + 46
    $connectorY = $nodeTop + 38
    $usableWidth = $Width - 32
    $gap = [math]::Floor(($usableWidth - ($count * $cardWidth)) / [math]::Max(($count - 1), 1))
    if ($gap -lt 12) {
        $gap = 12
    }
    $totalWidth = ($count * $cardWidth) + (($count - 1) * $gap)
    $startX = $X + [math]::Floor(($Width - $totalWidth) / 2)

    if ($count -gt 1) {
        $linePen = [System.Drawing.Pen]::new((New-Color "#61707f"), 2)
        for ($i = 0; $i -lt ($count - 1); $i++) {
            $centerA = $startX + ($i * ($cardWidth + $gap)) + 48
            $centerB = $startX + (($i + 1) * ($cardWidth + $gap)) + 48
            $Graphics.DrawLine($linePen, [float]$centerA, [float]$connectorY, [float]$centerB, [float]$connectorY)
        }
        $linePen.Dispose()
    }

    for ($i = 0; $i -lt $count; $i++) {
        $nodeX = $startX + ($i * ($cardWidth + $gap))
        Draw-Node -Graphics $Graphics -Node $nodes[$i] -X $nodeX -Y $nodeTop -Accent $Accent -NodeFont $NodeFont -BadgeFont $BadgeFont
    }

    $headerBrush.Dispose()
    $bodyBrush.Dispose()
    $headerPen.Dispose()
    $bodyPen.Dispose()
    $titleBrush.Dispose()
}

$columns = @(
    [pscustomobject]@{
        name = "CABAL"
        accent = "#c44a4a"
        x = 36
        branches = @(
            [pscustomobject]@{
                name = "Infantry"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/infantry/axe.json"; label = "Axe"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/infantry/assassin.json"; label = "Assassin"; badge = "T2"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/infantry/halbeard.json"; label = "Halbeard"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Ranged"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/ranged/ranged_t1.json"; label = "Crossbow"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/ranged/ranged_t2.json"; label = "Axe Thrower"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/ranged/ranged_t3.json"; label = "Bear Ballista"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Cavalry"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/cavalry/gorilla_t1.json"; label = "Hound"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/cavalry/gorilla_t2.json"; label = "Vrag"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/cavalry/burrow_bear.json"; label = "Burrow Bear"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Mages"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/mages/mages_t1.json"; label = "Darkmage"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/mages/mages_t2.json"; label = "Lich"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/mages/mages_t3.json"; label = "Creep"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Ghosts"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/cabal/ghosts/ghosts_t1.json"; label = "Ghosts"; badge = "T1"; state = "locked" },
                    [pscustomObject]@{ spec = "/pa/units/medieval/research/cabal/ghosts/ghosts_t2.json"; label = "Phantom"; badge = "T2"; state = "locked" },
                    [pscustomObject]@{ spec = "/pa/units/medieval/research/cabal/ghosts/ghosts_t3.json"; label = "Wyrm"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Upgrades"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/upgrades/cabal/infantry/sword_dox.json"; label = "Sword Upg"; badge = "UPG"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/upgrades/cabal/infantry/assassin.json"; label = "Assassin Upg"; badge = "UPG"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/upgrades/cabal/infantry/axe.json"; label = "Axe Upg"; badge = "UPG"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/upgrades/cabal/infantry/longbow.json"; label = "Longbow Upg"; badge = "UPG"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/upgrades/cabal/cavalry/gorilla_big.json"; label = "Vrag Upg"; badge = "UPG"; state = "locked" }
                )
            }
        )
    },
    [pscustomobject]@{
        name = "IMPERIA"
        accent = "#d7ac47"
        x = 786
        branches = @(
            [pscustomobject]@{
                name = "Infantry"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/infantry/infantry_t1.json"; label = "Shield"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/infantry/infantry_t2.json"; label = "Mace"; badge = "T2"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/infantry/infantry_t3.json"; label = "Pike"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Cavalry"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/cavalry/cavalry_t1.json"; label = "Light Cav"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/cavalry/cavalry_t2.json"; label = "Mounted Archer"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/cavalry/cavalry_t3.json"; label = "Heavy Cav"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Mercenaries"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/merc/merc_t1.json"; label = "Zweihander"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/merc/merc_t2.json"; label = "Javelin"; badge = "T2"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/merc/merc_t3.json"; label = "Guardian"; badge = "T3"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/merc/merc_t4.json"; label = "Cyclops"; badge = "T4"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Lightning"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/lightning/lightning_t1.json"; label = "Mage"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/lightning/lightning_t2.json"; label = "Elemental"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/lightning/lightning_t3.json"; label = "Arcanist"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Fog"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/fog/fog_t1.json"; label = "Windmage"; badge = "T1"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/fog/fog_t2.json"; label = "Elemental"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/fog/fog_t3.json"; label = "Eagle"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Fire"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/fire/fire_t1.json"; label = "Firemage"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/fire/fire_t2.json"; label = "Elemental"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/imperia/fire/fire_t3.json"; label = "Dragon"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Upgrades"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/upgrades/imperia/infantry/dual_sword.json"; label = "Dual Sword"; badge = "UPG"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/upgrades/imperia/infantry/champion.json"; label = "Champion"; badge = "UPG"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/upgrades/imperia/cavalry/heavy_cav.json"; label = "Charge"; badge = "UPG"; state = "locked" }
                )
            }
        )
    },
    [pscustomobject]@{
        name = "VESPERIN"
        accent = "#57b662"
        x = 1536
        branches = @(
            [pscustomobject]@{
                name = "Ranged"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/ranged/ranged_t1.json"; label = "Recurve"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/ranged/ranged_t2.json"; label = "Longbow"; badge = "T2"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/ranged/ranged_t3.json"; label = "Composite"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Spiders"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/spiders/spiders_t1.json"; label = "Jumping"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/spiders/spiders_t2.json"; label = "Web Trap"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/spiders/spiders_t3.json"; label = "Web Mother"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Bugs"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/bugs/bugs_t1.json"; label = "Roach"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/bugs/bugs_t2.json"; label = "Crab"; badge = "T2"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/bugs/bugs_t3.json"; label = "Scorpion"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Snakes"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/snakes/snakes_t1.json"; label = "Serpent"; badge = "T1"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/snakes/snakes_t2.json"; label = "Great Serpent"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/snakes/snakes_t3.json"; label = "Flying Cobra"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Pumpkin"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t1.json"; label = "Pumpkin"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t2.json"; label = "Munchkin"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t3.json"; label = "Guardian"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Witches"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/pumpkin/witch_t1.json"; label = "Witch"; badge = "T1"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/pumpkin/witch_t2.json"; label = "Jack"; badge = "T2"; state = "locked" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/research/vesperin/pumpkin/witch_t3.json"; label = "Witch Hut"; badge = "T3"; state = "locked" }
                )
            },
            [pscustomobject]@{
                name = "Upgrades"
                nodes = @(
                    [pscustomobject]@{ spec = "/pa/units/medieval/upgrades/vesperin/spiders/consume.json"; label = "Consume"; badge = "UPG"; state = "done" },
                    [pscustomobject]@{ spec = "/pa/units/medieval/upgrades/vesperin/spiders/nesting.json"; label = "Nesting"; badge = "UPG"; state = "locked" }
                )
            }
        )
    }
)

$width = 2280
$height = 1220
$bitmap = [System.Drawing.Bitmap]::new($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear((New-Color "#0b0d10"))

$titleFont = [System.Drawing.Font]::new("Segoe UI", 24, [System.Drawing.FontStyle]::Bold)
$subFont = [System.Drawing.Font]::new("Segoe UI", 11, [System.Drawing.FontStyle]::Regular)
$branchFont = [System.Drawing.Font]::new("Segoe UI", 11, [System.Drawing.FontStyle]::Bold)
$nodeFont = [System.Drawing.Font]::new("Segoe UI", 8.5, [System.Drawing.FontStyle]::Bold)
$badgeFont = [System.Drawing.Font]::new("Segoe UI", 6.8, [System.Drawing.FontStyle]::Bold)
$factionFont = [System.Drawing.Font]::new("Segoe UI", 18, [System.Drawing.FontStyle]::Bold)

$panelBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Rectangle]::new(18, 18, ($width - 36), ($height - 36)),
    (New-Color "#13171c"),
    (New-Color "#0d1014"),
    90.0
)
$panelPen = [System.Drawing.Pen]::new((New-Color "#2b3138"), 2)
$titleBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
$mutedBrush = [System.Drawing.SolidBrush]::new((New-Color "#91a0ab"))
$toggleBrush = [System.Drawing.SolidBrush]::new((New-Color "#1c252e"))
$togglePen = [System.Drawing.Pen]::new((New-Color "#4c6173"), 1)
$toggleOnBrush = [System.Drawing.SolidBrush]::new((New-Color "#67d46b"))
$doneSwatch = [System.Drawing.SolidBrush]::new((New-Color "#2ad46f"))
$lockedSwatch = [System.Drawing.SolidBrush]::new((New-Color "#4a5560"))
$footerBrush = [System.Drawing.SolidBrush]::new((New-Color "#71808c"))

$graphics.FillRectangle($panelBrush, 18, 18, ($width - 36), ($height - 36))
$graphics.DrawRectangle($panelPen, 18, 18, ($width - 36), ($height - 36))
$graphics.DrawString("Research Map Panel Mockup", $titleFont, $titleBrush, 42, 32)
$graphics.DrawString("All research and upgrades shown with real buildbar icons. Dim = not researched, full color = researched. Sample state shown.", $subFont, $mutedBrush, 44, 74)

$graphics.FillRectangle($toggleBrush, 1970, 34, 250, 44)
$graphics.DrawRectangle($togglePen, 1970, 34, 250, 44)
$graphics.DrawString("Panel Toggle", $branchFont, $titleBrush, 1988, 47)
$graphics.FillRectangle($toggleOnBrush, 2148, 40, 58, 30)
Draw-CenteredText -Graphics $graphics -Text "ON" -Font $branchFont -Brush ([System.Drawing.Brushes]::Black) -X 2148 -Y 40 -Width 58 -Height 30

$legendY = 96
$graphics.FillRectangle($doneSwatch, 44, $legendY, 18, 18)
$graphics.FillRectangle($lockedSwatch, 190, $legendY, 18, 18)
$graphics.DrawString("Researched", $subFont, $mutedBrush, 70, ($legendY - 1))
$graphics.DrawString("Unresearched", $subFont, $mutedBrush, 216, ($legendY - 1))

foreach ($column in $columns) {
    $accent = New-Color $column.accent
    $columnBrush = [System.Drawing.SolidBrush]::new((New-Color "#101419" 240))
    $columnPen = [System.Drawing.Pen]::new($accent, 2)
    $headerBrush = [System.Drawing.SolidBrush]::new((New-Color "#0c1014"))

    $graphics.FillRectangle($columnBrush, $column.x, 136, 708, 1030)
    $graphics.DrawRectangle($columnPen, $column.x, 136, 708, 1030)
    $graphics.FillRectangle($headerBrush, $column.x, 136, 708, 42)
    $graphics.DrawRectangle($columnPen, $column.x, 136, 708, 42)
    $graphics.DrawString($column.name, $factionFont, $titleBrush, ($column.x + 18), 144)

    $branchY = 196
    foreach ($branch in $column.branches) {
        Draw-Branch -Graphics $graphics -Branch $branch -X ($column.x + 18) -Y $branchY -Width 672 -Accent $accent -BranchFont $branchFont -NodeFont $nodeFont -BadgeFont $badgeFont
        $branchY += 138
    }

    $columnBrush.Dispose()
    $columnPen.Dispose()
    $headerBrush.Dispose()
}

$graphics.DrawString("Example output file: research_map_mockup.png", $subFont, $footerBrush, 44, 1178)

$outputPath = Join-Path (Get-Location) "research_map_mockup.png"
$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output $outputPath

$footerBrush.Dispose()
$doneSwatch.Dispose()
$lockedSwatch.Dispose()
$toggleOnBrush.Dispose()
$toggleBrush.Dispose()
$togglePen.Dispose()
$titleBrush.Dispose()
$mutedBrush.Dispose()
$panelBrush.Dispose()
$panelPen.Dispose()
$titleFont.Dispose()
$subFont.Dispose()
$branchFont.Dispose()
$nodeFont.Dispose()
$badgeFont.Dispose()
$factionFont.Dispose()
$graphics.Dispose()
$bitmap.Dispose()
