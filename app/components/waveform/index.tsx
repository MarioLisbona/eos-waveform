import { AudioDataProps } from "@/app/types";
import { Flex, Button, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState, useMemo } from "react";

export default function WaveForm({
  audioUrl,
  audioContentType,
  waveformDataUrl,
}: AudioDataProps) {
  return <div>WaveForm</div>;
}
