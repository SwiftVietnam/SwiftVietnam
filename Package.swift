// swift-tools-version:5.1

import PackageDescription

let package = Package(
    name: "Swiftvietnam",
    products: [
        .executable(name: "Swiftvietnam", targets: ["Swiftvietnam"])
    ],
    dependencies: [
        .package(url: "https://github.com/johnsundell/publish.git", from: "0.3.0")
    ],
    targets: [
        .target(
            name: "Swiftvietnam",
            dependencies: ["Publish"]
        )
    ]
)