import { StyledLink, StyledLinkProps } from 'rakkasjs'

export function Link(props: StyledLinkProps) {
	return (
		<StyledLink
			// prefetch='idle'
			{...props}
		/>
	)
}
