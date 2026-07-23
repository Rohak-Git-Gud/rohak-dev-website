import siteMetadata from "./site-meta-data.json";
import skillsData from "./skills-data.json";
import timelineData from "./timeline-data.json";
import projectsData from "./projects-data.json";
import aboutData from "./about-data.json";
import photoAlbum from "./photo-album.json";
import flavorText from "./flavor-text.json";

export { siteMetadata, skillsData, timelineData, projectsData, photoAlbum, aboutData, flavorText };

// For site-meta-data.json's photoPath, preferred path format: "/images/photo-album/hero.<ext>"
// For photo-album.json, preferred path format: "/images/photo-album/<image-name>"
// Even if photoAlbum is empty, keep "[]" inside photo-album.json to avoid breakage.
