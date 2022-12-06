    await label.connect(otherSigners[0]).addLabel(h, 0, 0, 2000, 2000);
    await label.connect(otherSigners[1]).addLabel(h, 1999, 1999, 2000, 2000);
    for (let i = 2; i < 4; i++) {
      await label.connect(otherSigners[i]).addLabel(h, 1999, 1999, 2000, 2000);
