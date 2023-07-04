export function ForceField({ node }) {
  return (
    <>
      <group
        name={node.oid}
        userData={{
          node: node,
          forceSize: node.forceSize,
          forceType: node.forceType,
          forceTwist: node.forceTwist,
          type: 'ForceField',
        }}
      ></group>
    </>
  )
}
