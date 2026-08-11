// Pre-v1 import compatibility only. The canonical renderer and fixture live in
// FiringScheduleArtwork; this file must disappear before the public contract
// freezes.
export { default, buildFiringScheduleFixture } from './FiringScheduleArtwork';
export type { FiringScheduleFixture } from './FiringScheduleArtwork';
