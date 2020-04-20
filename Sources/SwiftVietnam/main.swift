import Foundation
import Publish
import Plot
import SplashPublishPlugin

// This type acts as the configuration for your website.
struct SwiftVietnam: Website {
    enum SectionID: String, WebsiteSectionID {
        // Add the sections that you want your website to contain here:
        case posts
    }

    struct ItemMetadata: WebsiteItemMetadata {
        // Add any site-specific metadata that you want to use here.
    }

    // Update these properties to configure your website:
    var url = URL(string: "https://swiftvietnam.com")!
    var name = "Swift Vietnam Community"
    var description = "A community for Vietnamese Swift enthusiasts."
    var language: Language { .english }
    var imagePath: Path? { nil }
}

// This will generate your website using the built-in Foundation theme:
try SwiftVietnam().publish(
    withTheme: .swiftvietnam,
    plugins: [
         .splash(withClassPrefix: "s-")
    ]
)
