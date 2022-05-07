import styled, { keyframes } from 'styled-components'

import SleepingPandaSvg from 'components/atoms/SleepingPandaSvg'
import ZLetterSvg from 'components/atoms/ZLetterSvg'

const Wrapper = styled.div`
  position: relative;
`

const sleep = keyframes`
  0% {
    top: 70px;
    left: 82px;

    transform: rotate(0deg) scale(1);
    opacity: 0;
  }
  25% {
    top: 60px;
    left: 95px;

    transform: rotate(25deg) scale(0.75);
    opacity: 1;
  }
  50% {
    top: 52px;
    left: 85px;

    transform: rotate(-5deg) scale(0.6);
    opacity: 0.8;
  }
  75% {
    top: 42px;
    left: 95px;

    transform: rotate(30deg) scale(0.5);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`

interface AnimationProps {
  readonly $delay: number
}

const AnimatedZ = styled(ZLetterSvg)<AnimationProps>`
  position: absolute;

  animation: 4s ${sleep} linear infinite;
  animation-delay: ${({ $delay }) => $delay}ms;

  opacity: 0;
`

/**
 * Render an animated sleeping panda.
 */
const SleepingPanda = () => {
  return (
    <Wrapper>
      <SleepingPandaSvg />

      <AnimatedZ $delay={0} />
      <AnimatedZ $delay={1800} />
    </Wrapper>
  )
}

export default SleepingPanda
