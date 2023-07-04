import { EventAnimation } from './EventAnimation/EventAnimation'
import { Placement } from './EventAnimation/Placement'

export function WalkerContent() {
  return (
    <>
      <Placement scale={10} rotation={[0, Math.PI * -0.25, 0]} name={'spot1'}>
        <EventAnimation
          url={`/world/stations/stacy-textured-webp.glb`}
          event={`s1_2x`}
          animationIndex={2}
        ></EventAnimation>
      </Placement>

      <Placement scale={10} rotation={[0, Math.PI * 0.25, 0]} name={'spot2'}>
        <EventAnimation
          url={`/world/stations/stacy-textured-webp.glb`}
          event={`s4_2x`}
          animationIndex={3}
        ></EventAnimation>
      </Placement>

      {/*  */}
    </>
  )
}
